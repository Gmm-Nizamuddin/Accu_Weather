export default function SunMoon() {
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      <div className="px-5 py-3 border-b text-[12px] text-[#6c757d] font-semibold">
        SUN & MOON
      </div>

      <div className="px-5 py-4 space-y-4">

        {/* SUN */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            ☀
            <span>12 hrs 41 mins</span>
          </div>
          <div className="text-sm text-gray-500">
            Rise 05:31 <br /> Set 18:12
          </div>
        </div>

        {/* MOON */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            🌙
            <span>Waxing Crescent</span>
          </div>
          <div className="text-sm text-gray-500">
            Rise 05:45 <br /> Set 19:15
          </div>
        </div>

      </div>
    </div>
  );
}