import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { buildDynamicPrompt } from "@/lib/ai-config";
import { portfolioPromptContext, portfolioScopeResponse, sanitizeMessagesForModel, validateChatMessages, type ChatMessage } from "@/lib/chat-guardrails";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "edge";
export const maxDuration = 30;

const PRIMARY_MODEL = "openai/gpt-oss-120b";
const FALLBACK_MODEL = "qwen/qwen3.6-27b";
const CHAT_UNAVAILABLE_MESSAGE =
  "I am currently experiencing an unusually high volume of messages. If you need an immediate response, please feel free to reach out directly through my contact page.";

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

function logGroqError(model: string, error: unknown) {
  const details: Record<string, unknown> = { model };

  if (error instanceof Error) {
    details.name = error.name;
  } else {
    details.name = "Unknown Groq error";
  }

  if (typeof error === "object" && error !== null) {
    if ("statusCode" in error) details.statusCode = error.statusCode;
    if ("isRetryable" in error) details.isRetryable = error.isRetryable;
  }

  console.error("Groq chat request failed", details);
}

function logRateLimitError(error: unknown) {
  const details: Record<string, unknown> = { name: "Unknown rate limit error" };
  if (error instanceof Error) details.name = error.name;
  if (typeof error === "object" && error !== null && "statusCode" in error) details.statusCode = error.statusCode;
  console.error("Chat rate limit failed", details);
}

async function readRequestBody(req: Request) {
  if (!req.body) throw new Error("Missing request body");
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 32_000) {
      await reader.cancel();
      throw new RangeError("Request body exceeds the maximum allowed length.");
    }
    chunks.push(value);
  }

  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

async function streamModelResponse(modelName: string, model: ReturnType<typeof groq>, system: string, messages: ChatMessage[]) {
  const result = streamText({
    model,
    system,
    messages,
    maxOutputTokens: 800,
    onError: ({ error }) => logGroqError(modelName, error),
  });
  const reader = result.fullStream.getReader();
  const encoder = new TextEncoder();
  let firstText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done || value.type === "finish") {
      await reader.cancel();
      throw new Error("Model completed without a response.");
    }
    if (value.type === "error") {
      await reader.cancel();
      throw value.error;
    }
    if (value.type === "text-delta" && value.text) {
      firstText = value.text;
      break;
    }
  }

  return new Response(new ReadableStream({
    start(controller) {
      if (firstText) controller.enqueue(encoder.encode(firstText));
    },
    async pull(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done || value.type === "finish") {
            controller.close();
            return;
          }
          if (value.type === "error") {
            logGroqError(modelName, value.error);
            await reader.cancel();
            controller.enqueue(encoder.encode("\n\nI’m having trouble finishing that response. Please try again or use the contact page."));
            controller.close();
            return;
          }
          if (value.type === "text-delta" && value.text) {
            controller.enqueue(encoder.encode(value.text));
            return;
          }
        }
      } catch (error) {
        logGroqError(modelName, error);
        await reader.cancel();
        controller.enqueue(encoder.encode("\n\nI’m having trouble finishing that response. Please try again or use the contact page."));
        controller.close();
      }
    },
    cancel() {
      void reader.cancel();
    },
  }), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";

  let success: boolean;
  try {
    ({ success } = await ratelimit.limit(ip));
  } catch (error) {
    logRateLimitError(error);
    return new Response(CHAT_UNAVAILABLE_MESSAGE, { status: 503 });
  }
  if (!success) {
    return new Response(
      CHAT_UNAVAILABLE_MESSAGE,
      {
        status: 429,
      },
    );
  }

  let payload: { messages?: unknown };
  try {
    const parsed: unknown = JSON.parse(await readRequestBody(req));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid payload");
    payload = parsed;
  } catch (error) {
    if (error instanceof RangeError) return new Response(error.message, { status: 413 });
    return new Response("Invalid chat request.", { status: 400 });
  }

  const validated = validateChatMessages(payload.messages);
  if ("error" in validated) return new Response(validated.error, { status: 400 });

  const modelMessages = sanitizeMessagesForModel(validated.messages);
  const latestMessage = validated.messages.at(-1);
  if (modelMessages.at(-1) !== latestMessage) {
    const redirect = portfolioScopeResponse([latestMessage!]);
    return new Response(redirect ?? "I'm Ian's AI portfolio assistant, so I can help with his background, projects, technical work, or contact details.", { status: 200 });
  }

  const dynamicSystemPrompt = buildDynamicPrompt(portfolioPromptContext(modelMessages));

  try {
    return await streamModelResponse(PRIMARY_MODEL, groq(PRIMARY_MODEL), dynamicSystemPrompt, modelMessages);
  } catch (primaryError: unknown) {
    logGroqError(PRIMARY_MODEL, primaryError);
    console.warn(`Falling back to Groq model ${FALLBACK_MODEL}`);

    try {
      return await streamModelResponse(FALLBACK_MODEL, groq(FALLBACK_MODEL), dynamicSystemPrompt, modelMessages);
    } catch (fallbackError: unknown) {
      logGroqError(FALLBACK_MODEL, fallbackError);
      return new Response(CHAT_UNAVAILABLE_MESSAGE, { status: 503 });
    }
  }
}
