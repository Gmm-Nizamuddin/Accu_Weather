import { useEffect, useState } from "react";
import { getWeatherIcon, getDayDesc } from "./TodayCard";

export default function CurrentWeather() {
  const [data, setData] = useState(null);
  const [time, setTime] = useState("");
  const [coords, setCoords] = useState(null);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch weather
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        setCoords({ latitude, longitude });
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,windgusts_10m,winddirection_10m` +
            `&timezone=auto`
          );
          const json = await res.json();
          const c = json.current;

          // Wind direction degrees → compass
          const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
          const dir = dirs[Math.round(c.winddirection_10m / 22.5) % 16];

          // RealFeel Shade ≈ apparent_temp - 1~3°
          const realFeelShade = Math.round(c.apparent_temperature - 2);

          setData({
            temp: Math.round(c.temperature_2m),
            realFeel: Math.round(c.apparent_temperature),
            realFeelShade,
            code: c.weathercode,
            wind: `${dir} ${Math.round(c.windspeed_10m)} km/h`,
            windGusts: `${Math.round(c.windgusts_10m)} km/h`,
          });
        } catch {}

        // Air Quality from Open-Meteo AQI
        try {
          const aqRes = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi`
          );
          const aqJson = await aqRes.json();
          const aqi = aqJson.current.european_aqi;

          let aqLabel = "Good";
          let aqColor = "text-green-500";
          if (aqi > 20 && aqi <= 40) { aqLabel = "Fair"; aqColor = "text-yellow-500"; }
          else if (aqi > 40 && aqi <= 60) { aqLabel = "Moderate"; aqColor = "text-orange-400"; }
          else if (aqi > 60 && aqi <= 80) { aqLabel = "Poor"; aqColor = "text-orange-500"; }
          else if (aqi > 80 && aqi <= 100) { aqLabel = "Very Poor"; aqColor = "text-red-500"; }
          else if (aqi > 100) { aqLabel = "Hazardous"; aqColor = "text-red-700"; }

          setData(prev => prev ? { ...prev, aqLabel, aqColor } : prev);
        } catch {
          setData(prev => prev ? { ...prev, aqLabel: "N/A", aqColor: "text-gray-400" } : prev);
        }
      },
      () => {
        // Fallback
        setData({
          temp: 30,
          realFeel: 35,
          realFeelShade: 34,
          code: 2,
          wind: "W 20 km/h",
          windGusts: "25 km/h",
          aqLabel: "Poor",
          aqColor: "text-orange-500",
        });
      }
    );
  }, []);

  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between px-5 py-3 border-b border-gray-300 text-[#6c757d] text-[12px] font-semibold">
        <span>CURRENT WEATHER</span>
        <span className="text-black font-medium">{time}</span>
      </div>

      {/* BODY */}
      <div className="px-6 py-6 flex justify-between items-center">
        {!data ? (
          <p className="text-gray-400 text-[13px]">Loading weather...</p>
        ) : (
          <>
            {/* LEFT */}
            <div className="flex items-center gap-6">
              {/* ICON */}
              <div className="w-[90px] h-[90px] flex items-center justify-center">
                {getWeatherIcon(data.code, false, 90)}
              </div>

              {/* TEMP BLOCK */}
              <div>
                <div className="flex items-end gap-1">
                  <h1 className="text-[80px] font-semibold leading-none tracking-tight">
                    {data.temp}°
                  </h1>
                  <span className="text-gray-500 text-[20px] mb-2">C</span>
                </div>
                <p className="text-[#6c757d] text-[14px] mt-1">
                  RealFeel® {data.realFeel}°
                </p>
                <p className="mt-3 text-[18px] font-medium">
                  {getDayDesc(data.code)}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 cursor-pointer tracking-wide">
                  MORE DETAILS &rsaquo;
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-[300px] text-[14px]">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">RealFeel Shade™</span>
                <span className="font-semibold">{data.realFeelShade}°</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Wind</span>
                <span className="font-semibold">{data.wind}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Wind Gusts</span>
                <span className="font-semibold">{data.windGusts}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Air Quality</span>
                <span className={`font-semibold ${data.aqColor}`}>{data.aqLabel}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}