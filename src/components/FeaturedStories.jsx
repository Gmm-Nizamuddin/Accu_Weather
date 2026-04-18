export default function FeaturedStories() {
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      {/* HEADER */}
      <div className="px-5 py-4 border-b border-gray-300">
        <h2 className="font-semibold text-[20px]">Featured Stories</h2>
      </div>

      {/* ITEMS */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex justify-between items-start gap-4 px-5 py-4 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
        >
          {/* TEXT */}
          <div className="flex-1">

            <p className="text-[11px] text-gray-500 uppercase tracking-wide">
              ASTRONOMY
            </p>

            <p className="text-[15px] leading-[20px] mt-1 font-medium">
              Lyrids 2026: How to see the 1st meteor shower since January
            </p>

            <p className="text-[12px] text-gray-400 mt-2">
              15 hours ago
            </p>
          </div>

          {/* IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
            className="w-[90px] h-[65px] object-cover rounded-md"
          />
        </div>
      ))}

      {/* MORE */}
      <div className="px-5 py-3 text-[14px] font-medium cursor-pointer hover:underline">
        More Stories
      </div>

    </div>
  );
}