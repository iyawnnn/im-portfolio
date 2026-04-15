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

  try {
    // PRIMARY ROUTE: Groq Llama 3.3 70B (Lightning Fast, Massive Free Tier)
    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: dynamicSystemPrompt,
      messages,
    });
    
    return result.toTextStreamResponse();
    
  } catch (groqError: any) {
    console.warn("Groq failed, falling back to Google:", groqError.message);
    
    try {
      // FALLBACK ROUTE: Google Gemini 2.5 Flash Lite
      const fallbackResult = await streamText({
        model: google("gemini-2.5-flash-lite"),
        system: dynamicSystemPrompt,
        messages,
      });
      
      return fallbackResult.toTextStreamResponse();
      
    } catch (googleError: any) {
      console.error("All AI providers exhausted.");
      return new Response("Servers are currently taking a coffee break. Try again later.", { status: 503 });
    }
  }
}