import { useEffect, useState } from "react";

export function getAccuWeatherIconUrl(code, isNight = false) {
  const dayMap = {
    0: 1, 1: 2, 2: 3, 3: 6,
    45: 11, 48: 11,
    51: 13, 53: 18, 55: 18,
    61: 18, 63: 18, 65: 26,
    71: 22, 73: 22, 75: 22, 77: 24,
    80: 14, 81: 14, 82: 14,
    85: 23, 86: 23,
    95: 15, 96: 16, 99: 16,
  };

  const nightMap = {
    0: 33, 1: 34, 2: 35, 3: 38,
    45: 11, 48: 11,
    51: 43, 53: 18, 55: 18,
    61: 18, 63: 18, 65: 26,
    71: 22, 73: 22, 75: 22, 77: 24,
    80: 39, 81: 18, 82: 18,
    85: 23, 86: 23,
    95: 15, 96: 16, 99: 16,
  };

  const map = isNight ? nightMap : dayMap;
  const keys = Object.keys(map).map(Number);
  const closest = keys.reduce((prev, curr) =>
    Math.abs(curr - code) < Math.abs(prev - code) ? curr : prev
  );
  const iconNum = map[closest];
  return `https://www.awxcdn.com/adc-assets/images/weathericons/v2a/${iconNum}.svg`;
}

export function getWeatherIcon(code, isNight = false, size = 28) {
  const src = getAccuWeatherIconUrl(code, isNight);
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="weather icon"
      onError={(e) => { e.target.style.display = "none"; }}
    />
  );
}

export function getDayDesc(code) {
  if (code === 0) return "Sunny";
  if (code <= 2) return "Long periods of sunshine";
  if (code === 3) return "Partly cloudy";
  if (code <= 48) return "Foggy conditions";
  if (code <= 55) return "Light drizzle";
  if (code <= 67) return "Rainy periods";
  if (code <= 77) return "Snow showers";
  if (code <= 82) return "Rain showers";
  return "Thunderstorms possible";
}

export function getNightDesc(code) {
  if (code <= 2) return "Mainly clear";
  if (code === 3) return "Mostly cloudy";
  if (code <= 48) return "Foggy overnight";
  if (code <= 55) return "Light drizzle overnight";
  if (code <= 67) return "Rain overnight";
  if (code <= 77) return "Snow overnight";
  if (code <= 82) return "Showers overnight";
  return "Storms overnight";
}

export default function TodayCard() {
  const [data, setData] = useState(null);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const now = new Date();
    setDateStr(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);

    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
          );
          const json = await res.json();
          setData({
            code: json.daily.weathercode[0],
            hi: Math.round(json.daily.temperature_2m_max[0]),
            lo: Math.round(json.daily.temperature_2m_min[0]),
          });
        } catch {}
      },
      () => setData({ code: 1, hi: 34, lo: 25 })
    );
  }, []);

  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">
      <div className="flex justify-between px-5 py-3 border-b border-gray-300 text-[#6c757d] text-[12px] font-semibold">
        <span>TODAY'S WEATHER</span>
        <span className="text-black font-medium">{dateStr}</span>
      </div>
      <div className="px-5 py-4 text-[15px]">
        {!data ? (
          <p className="text-gray-400 text-[13px]">Loading weather...</p>
        ) : (
          <>
            <p className="flex items-center gap-3">
              {getWeatherIcon(data.code, false, 30)}
              <span>{getDayDesc(data.code)} Hi: <b>{data.hi}°</b></span>
            </p>
            <p className="flex items-center gap-3 mt-3">
              {getWeatherIcon(data.code, true, 30)}
              <span>Tonight: {getNightDesc(data.code)} Lo: <b>{data.lo}°</b></span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}