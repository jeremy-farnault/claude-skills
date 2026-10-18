// Usage: tsx weather.ts [YYYY-MM-DD]
// Prints the Stockholm forecast for the ride to work (05:00–06:00) and home (17:00–18:00) as JSON.
// Open-Meteo: free, no API key.
import { stockholmDate } from "./time.ts";

const day = process.argv[2] ?? stockholmDate();
const RIDES = { toWork: ["05:00", "06:00"], home: ["17:00", "18:00"] };

const params = new URLSearchParams({
  latitude: "59.33",
  longitude: "18.07",
  hourly: "temperature_2m,apparent_temperature,precipitation_probability,precipitation,wind_speed_10m,weather_code",
  wind_speed_unit: "ms",
  timezone: "Europe/Stockholm",
  start_date: day,
  end_date: day,
});

const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
if (!res.ok) {
  console.error(`Weather fetch failed: HTTP ${res.status}`);
  process.exit(1);
}
const { hourly } = await res.json();

// WMO weather codes, grouped into what matters on a bike.
const describe = (code: number) =>
  code === 0 ? "clear" :
  code <= 3 ? "cloudy" :
  code <= 48 ? "fog" :
  code <= 57 ? "drizzle" :
  code <= 67 ? "rain" :
  code <= 77 ? "snow" :
  code <= 82 ? "rain showers" :
  code <= 86 ? "snow showers" : "thunderstorm";

const hoursFor = (times: string[]) =>
  times.map((time) => {
    const i = hourly.time.indexOf(`${day}T${time}`);
    return {
      time,
      tempC: hourly.temperature_2m[i],
      feelsLikeC: hourly.apparent_temperature[i],
      precipitationChance: hourly.precipitation_probability[i],
      precipitationMm: hourly.precipitation[i],
      windMs: hourly.wind_speed_10m[i],
      sky: describe(hourly.weather_code[i]),
    };
  });

console.log(JSON.stringify({ day, toWork: hoursFor(RIDES.toWork), home: hoursFor(RIDES.home) }, null, 2));
