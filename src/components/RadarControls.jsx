export default function RadarControls() {
  return (
    <div className="bg-white px-5 py-4 border border-gray-300 rounded-md shadow-sm flex gap-4">

      {/* CLOUDS */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        <img
          src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
          className="w-6 h-6"
        />
        <span className="text-sm">Clouds</span>
      </div>

      {/* TEMPERATURE */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        <img
          src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
          className="w-6 h-6"
        />
        <span className="text-sm">Temperature</span>
      </div>

    </div>
  );
}