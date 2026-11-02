export async function getWakaTimeStats() {
  const accessToken = process.env.WAKATIME_ACCESS_TOKEN;
  
  if (!accessToken) return null;

  // Utilize the native fetch API with Next.js caching parameters
  const response = await fetch(
    "https://wakatime.com/api/v1/users/current/stats/last_7_days",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60, // Background refresh every 60 seconds
      },
    }
  );

  if (!response.ok) return null;
  return response.json();
}
