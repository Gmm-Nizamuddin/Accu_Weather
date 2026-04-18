export default function HourlyWeather() {
  const data = [
    { time: "12", temp: 35 },
    { time: "13", temp: 34 },
    { time: "14", temp: 33 },
    { time: "15", temp: 33 },
    { time: "16", temp: 32 },
    { time: "17", temp: 30 },
    { time: "18", temp: 29 },
    { time: "19", temp: 29 },
  ];

  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      {/* HEADER */}
      <div className="px-5 py-3 border-b border-gray-300 text-[12px] text-[#6c757d] font-semibold">
        HOURLY WEATHER
      </div>

      {/* SCROLL */}
      <div className="flex items-center">

        {/* LEFT ARROW */}
        <div className="px-3 text-gray-400 text-xl cursor-pointer">
          ‹
        </div>

        {/* ITEMS */}
        <div className="flex overflow-x-auto gap-8 px-2 py-5">

          {data.map((item, i) => (
            <div key={i} className="text-center min-w-[70px]">

              <p className="text-sm">{item.time}</p>

              <img
                src="https://developer.accuweather.com/sites/default/files/01-s.png"
                className="w-10 mx-auto"
              />

              <p className="text-lg font-semibold">{item.temp}°</p>

              <p className="text-xs text-gray-400">0%</p>

            </div>
          ))}

        </div>

        {/* RIGHT ARROW */}
        <div className="px-3 text-gray-400 text-xl cursor-pointer">
          ›
        </div>

      </div>
    </div>
  );
}