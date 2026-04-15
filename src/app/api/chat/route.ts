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
    return new Response("I am currently experiencing an unusually high volume of messages. If you need an immediate response, please feel free to reach out directly through my contact page.", {
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
    // CHANGE THIS TO 8B FOR STABLE TESTING
    // It has a much higher token limit and is less likely to fail
    const result = await streamText({
      model: groq("llama-3.1-8b-instant"), 
      system: dynamicSystemPrompt,
      messages,
    });
    
    return result.toTextStreamResponse();
    
  } catch (primaryError: any) {
    console.warn("Primary model failed, falling back to 70B (if available)...");
    
    try {
      const fallbackResult = await streamText({
        model: groq("llama-3.3-70b-versatile"),
        system: dynamicSystemPrompt,
        messages,
      });
      
      return fallbackResult.toTextStreamResponse();
      
    } catch (fallbackError: any) {
      // THIS IS WHERE YOUR NEW UI MESSAGE TRIGGERS
      return new Response("I am currently experiencing an unusually high volume of messages. If you need an immediate response, please feel free to reach out directly through my contact page.", { status: 503 });
    }
  }
}