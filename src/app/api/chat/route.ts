import { google } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { buildDynamicPrompt } from "@/lib/ai-config";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "edge";
export const maxDuration = 30;

// Initialize explicitly to guarantee the key is read
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true, 
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response("Rate limit exceeded. Please try again in a minute.", {
      status: 429,
    });
  }

  const { messages } = await req.json();
  const latestMessage = messages[messages.length - 1]?.content || "";

  if (latestMessage.length > 500) {
    return new Response("Message exceeds maximum allowed length.", { status: 400 });
  }

  const blockedKeywords = ["ignore previous instructions", "system prompt", "bypass", "python script", "write code"];
  if (blockedKeywords.some((word) => latestMessage.toLowerCase().includes(word))) {
    return new Response(
      "I am programmed to strictly discuss web development and my portfolio. I cannot process that request.", 
      { status: 400 }
    );
  }

  const dynamicSystemPrompt = buildDynamicPrompt(latestMessage);

  // DECLARE AT THE ROOT LEVEL: Prevents Edge from closing the connection early
  let streamResult;

  try {
    console.log("Attempting Primary (Google)...");
    streamResult = await streamText({
      model: google("gemini-broken-1"), // Keep broken for one last test
      system: dynamicSystemPrompt,
      messages,
    });
  } catch (error1: any) {
    console.warn("Primary failed:", error1.message);

    try {
      console.log("Attempting Secondary (Google)...");
      streamResult = await streamText({
        model: google("gemini-broken-2"), // Keep broken for one last test
        system: dynamicSystemPrompt,
        messages,
      });
    } catch (error2: any) {
      console.warn("Secondary failed:", error2.message);

      try {
        console.log("Attempting Tertiary (Groq)...");
        streamResult = await streamText({
          model: groq("llama-3.3-70b-versatile"),
          system: dynamicSystemPrompt,
          messages,
        });
      } catch (error3: any) {
        console.error("All AI providers exhausted:", error3.message);
        return new Response("Servers are currently taking a coffee break. Try again later.", { status: 503 });
      }
    }
  }

  // RETURN AT THE ROOT LEVEL: Forces Next.js to stream the data properly!
  return streamResult.toTextStreamResponse();
}