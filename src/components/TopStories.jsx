export default function TopStories() {
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      {/* HEADER */}
      <div className="px-5 py-4 border-b border-gray-300">
        <h2 className="font-semibold text-[20px]">Top Stories</h2>
      </div>

      {/* ITEMS */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex justify-between items-start gap-4 px-5 py-4 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
        >
          {/* LEFT TEXT */}
          <div className="flex-1">

            <p className="text-[11px] text-gray-500 uppercase tracking-wide">
              SEVERE WEATHER
            </p>

            <p className="text-[15px] leading-[20px] mt-1 font-medium">
              Severe weather outbreak to peak Friday with tornado risk in central US
            </p>

            <p className="text-[12px] text-gray-400 mt-2">
              5 hours ago
            </p>
          </div>

          {/* IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
            className="w-[90px] h-[65px] object-cover rounded-md"
          />
        </div>
      ))}

      {/* MORE STORIES */}
      <div className="px-5 py-3 text-[14px] text-black font-medium cursor-pointer hover:underline">
        More Stories
      </div>

    </div>
  );
}