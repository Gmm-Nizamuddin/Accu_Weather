import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import TodayCard from "../components/TodayCard";
import CurrentWeather from "../components/src/components/CurrentWeather.jsx";
import TopStories from "../components/TopStories";

export default function Home() {
  return (
    <>
      <Navbar />
      <Tabs />

      <div className="bg-[#e9ecef] min-h-screen py-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-4">
            <TodayCard />
            <CurrentWeather />

            <div className="bg-white rounded-md p-5 shadow-sm">
              <p className="text-gray-500 text-sm">LOOKING AHEAD</p>
              <p className="text-lg mt-2">Breezy Wednesday</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <TopStories />
          </div>

        </div>
      </div>
    </>
  );
}