export default function AirQuality() {
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      <div className="flex justify-between px-5 py-3 border-b text-[12px] text-[#6c757d] font-semibold">
        <span>AIR QUALITY</span>
        <span className="cursor-pointer hover:underline">SEE MORE</span>
      </div>

      <div className="px-5 py-4">
        <div className="flex justify-between items-center">
          <span>Air Quality</span>
          <span className="text-orange-500 font-semibold">Poor</span>
        </div>

        <p className="text-sm text-gray-600 mt-3">
          The air has reached a high level of pollution.
        </p>
      </div>

    </div>
  );
}