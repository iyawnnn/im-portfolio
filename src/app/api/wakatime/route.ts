import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ total: "0 hrs", language: "None" });
  }

  try {
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    const total = data.data?.human_readable_total_including_other_language || data.data?.human_readable_total || "0 hrs";
    const language = data.data?.languages?.[0]?.name || "No data yet";

    return NextResponse.json({
      total,
      language,
    });
  } catch (error) {
    return NextResponse.json({ total: "0 hrs", language: "Unknown" });
  }
}