export default function RadarMap() {
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm overflow-hidden">

      <div className="px-5 py-3 border-b border-gray-300 text-[12px] text-[#6c757d] font-semibold">
        COX'S BAZAR WEATHER RADAR
      </div>

      <div className="w-full h-[320px]">
        <iframe
          src="https://embed.windy.com/embed2.html?lat=21.45&lon=91.97&zoom=5&overlay=rain"
          className="w-full h-full border-0"
        ></iframe>
      </div>

    </div>
  );
}