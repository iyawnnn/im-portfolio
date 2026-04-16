export async function getWakaTimeStats() {
  const apiKey = process.env.WAKATIME_API_KEY;
  
  if (!apiKey) return null;

  // Utilize the native fetch API with Next.js caching parameters
  const response = await fetch(
    "https://wakatime.com/api/v1/users/current/stats/last_7_days",
    {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      },
      next: {
        revalidate: 60, // Background refresh every 60 seconds
      },
    }
  );

  if (!response.ok) return null;
  return response.json();
}