export default function Tabs() {
  const tabs = ["TODAY","HOURLY","10-DAY","RADAR","MINUTECAST","MONTHLY","AIR QUALITY"];

  return (
    <div className="bg-[#e9ecef] mt-[90px] px-8 flex gap-6 h-[45px] items-center text-sm">
      {tabs.map((t,i)=>(
        <span key={i} className={i===0 ? "border-b-2 border-orange-500 pb-2 font-semibold" : "text-gray-600"}>
          {t}
        </span>
      ))}
    </div>
  );
}