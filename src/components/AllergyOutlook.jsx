export default function AllergyOutlook() {
  return (
    <div className="bg-white rounded-md border border-gray-300 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between px-5 py-3 border-b text-[12px] text-[#6c757d] font-semibold">
        <span>ALLERGY OUTLOOK</span>
        <span className="cursor-pointer hover:underline">SEE ALL</span>
      </div>

      {/* BODY */}
      <div className="px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          🌿
          <span>Dust & Dander</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-purple-600 font-semibold">Extreme</span>
          <div className="w-[3px] h-6 bg-purple-600 rounded"></div>
        </div>
      </div>

    </div>
  );
}