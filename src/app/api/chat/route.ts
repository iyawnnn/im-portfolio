import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { PORTFOLIO_AI_SYSTEM_PROMPT } from '@/lib/ai-config';

export const maxDuration = 30;

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; 
const TIME_WINDOW_MS = 60000; 

function checkRateLimit(ip: string): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > TIME_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  
  const isAllowed = checkRateLimit(ip);
  if (!isAllowed) {
    return new Response('Rate limit exceeded. Please try again later.', { status: 429 });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-2.5-flash'),
    system: PORTFOLIO_AI_SYSTEM_PROMPT,
    messages,
  });

  return result.toTextStreamResponse();
}