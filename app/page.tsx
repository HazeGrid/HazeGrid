import { notFound } from "next/navigation";
import { DEFAULT_LOCATION } from "@/lib/constants";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const lat = searchParams.lat || DEFAULT_LOCATION.lat;
  const lon = searchParams.lon || DEFAULT_LOCATION.lon;

  try {
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${process.env.TOMORROW_API_KEY}&units=metric`
    );
    
    if (!response.ok) throw new Error("Weather data fetch failed");

    const data = await response.json();

    return (
      <div className="container max-w-screen-lg p-4">
        <h1 className="text-3xl font-bold mb-4">Weather for {data.location.name}</h1>
        <pre className="bg-black text-white p-4 rounded">{JSON.stringify(data.timelines.hourly[0].values, null, 2)}</pre>
      </div>
    );
  } catch {
    return notFound();
  }
}
