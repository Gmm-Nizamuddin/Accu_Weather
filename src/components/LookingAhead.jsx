import { useEffect, useState } from "react";

export default function LookingAhead() {
  const [text, setText] = useState("Loading...");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const latitude = 21.4272;   // Cox's Bazar
        const longitude = 92.0058;

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current=weathercode,windspeed_10m` +
          `&timezone=auto`
        );

        const data = await res.json();

        const code = data.current.weathercode;
        const wind = data.current.windspeed_10m;

        // weather code → text
        const weatherMap = {
          0: "Clear",
          1: "Mainly clear",
          2: "Partly cloudy",
          3: "Cloudy",
          61: "Rain",
          63: "Rain",
          80: "Showers",
          95: "Thunderstorm"
        };

        let description = weatherMap[code] || "Weather";

        // wind logic → Breezy
        if (wind > 25) {
          description = "Breezy";
        }

        // next day name
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dayName = tomorrow.toLocaleDateString("en-US", {
          weekday: "long",
        });

        setText(`${description} ${dayName}`);
      } catch (error) {
        console.error(error);
        setText("Weather unavailable");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      {/* HEADER */}
      <div className="px-5 py-3 border-b border-gray-300 text-[12px] text-[#6c757d] font-semibold">
        LOOKING AHEAD
      </div>

      {/* BODY */}
      <div className="px-5 py-4 text-[18px]">
        {text}
      </div>

    </div>
  );
}