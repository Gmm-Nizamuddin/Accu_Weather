export default function TenDayWeather() {
  const data = [
    { day: "TODAY", date: "18/04", high: 35, low: 25, desc: "Long periods of sunshine", night: "Mainly clear", rain: "3%" },
    { day: "SUN", date: "19/04", high: 35, low: 25, desc: "Sunny spells", night: "Mainly clear", rain: "2%" },
    { day: "MON", date: "20/04", high: 35, low: 26, desc: "Sunny spells", night: "Partly cloudy", rain: "4%" },
    { day: "TUE", date: "21/04", high: 35, low: 26, desc: "Sunny spells", night: "Partly cloudy", rain: "8%" },
    { day: "WED", date: "22/04", high: 33, low: 25, desc: "Partly sunny", night: "Clear", rain: "2%" },
    { day: "THU", date: "23/04", high: 32, low: 25, desc: "Sunny spells", night: "Partly cloudy", rain: "1%" },
    { day: "FRI", date: "24/04", high: 36, low: 26, desc: "Hot with long sunny spells", night: "Humid", rain: "1%" },
    { day: "SAT", date: "25/04", high: 36, low: 26, desc: "Hot with bright spells", night: "Patchy clouds", rain: "0%" },
    { day: "SUN", date: "26/04", high: 35, low: 26, desc: "Spells of sunshine", night: "Patchy clouds", rain: "1%" },
    { day: "MON", date: "27/04", high: 32, low: 25, desc: "Long periods of sunshine", night: "Partly cloudy", rain: "1%" },
  ];

  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      <div className="px-5 py-3 border-b text-[12px] text-[#6c757d] font-semibold">
        10-DAY WEATHER FORECAST
      </div>

      {data.map((item, i) => (
        <div key={i} className="flex justify-between items-center px-5 py-4 border-b">

          <div className="w-[90px]">
            <p className="font-semibold">{item.day}</p>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>

          <div className="flex items-center gap-3 w-[120px]">
            <img src="https://developer.accuweather.com/sites/default/files/01-s.png" className="w-8" />
            <p className="font-semibold">{item.high}°
              <span className="text-gray-500 ml-1">{item.low}°</span>
            </p>
          </div>

          <div className="flex-1 text-sm">
            <p>{item.desc}</p>
            <p className="text-gray-500">🌙 {item.night}</p>
          </div>

          <div className="w-[50px] text-right text-sm text-gray-500">
            💧 {item.rain}
          </div>
        </div>
      ))}

    </div>
  );
}