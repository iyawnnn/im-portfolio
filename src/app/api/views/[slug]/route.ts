import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

// Utility to create a secure, one-way hash of the IP address
async function getIPHash(ip: string, slug: string) {
  const data = new TextEncoder().encode(ip + slug);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) {
    return new NextResponse("Slug is required", { status: 400 });
  }

  try {
    // 1. Extract the IP address
    let ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    // 2. Create the anonymous identifier
    const ipHash = await getIPHash(ip, slug);
    
    const dedupKey = `dedup:blog:${slug}:${ipHash}`;
    const viewKey = `pageviews:blog:${slug}`;

    // 3. SETNX (Set if Not eXists). 'ex: 86400' expires the lock after 24 hours.
    // This returns "OK" if the key was set (new user), or null if it already exists.
    const isNewView = await redis.set(dedupKey, "true", { ex: 86400, nx: true });

    let views: number;
    
    if (isNewView) {
      // 4a. Unique visit: Increment your existing counter
      views = await redis.incr(viewKey);
    } else {
      // 4b. Duplicate visit: Read the current number without incrementing
      views = await redis.get<number>(viewKey) ?? 0;
    }

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Redis Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const views = await redis.get<number>(`pageviews:blog:${slug}`) ?? 0;
  return NextResponse.json({ views });
}