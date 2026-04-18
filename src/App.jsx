import Navbar from "./components/Navbar";
import TodayCard from "./components/TodayCard";
import CurrentWeather from "./components/CurrentWeather";
import LookingAhead from "./components/LookingAhead";
import RadarMap from "./components/RadarMap";
import RadarControls from "./components/RadarControls";
import HourlyWeather from "./components/HourlyWeather";
import TenDayWeather from "./components/TenDayWeather";
import SunMoon from "./components/SunMoon";
import AirQuality from "./components/AirQuality";
import AllergyOutlook from "./components/AllergyOutlook";
import TopStories from "./components/TopStories";
import FeaturedStories from "./components/FeaturedStories";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#e9ecef] min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* TABS */}
      <div className="bg-[#f8f9fa] border-b mt-[96px]">
        <div className="max-w-[1100px] mx-auto flex gap-6 text-[14px] text-gray-600 px-2 overflow-x-auto">
          <span className="py-3 border-b-2 border-orange-500 text-black font-medium whitespace-nowrap">
            TODAY
          </span>
          <span className="py-3 whitespace-nowrap">HOURLY</span>
          <span className="py-3 whitespace-nowrap">10-DAY</span>
          <span className="py-3 whitespace-nowrap">RADAR</span>
          <span className="py-3 whitespace-nowrap">MINUTECAST</span>
          <span className="py-3 whitespace-nowrap">MONTHLY</span>
          <span className="py-3 whitespace-nowrap">AIR QUALITY</span>
          <span className="py-3 whitespace-nowrap">HEALTH & ACTIVITIES</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1100px] mx-auto mt-6 grid grid-cols-3 gap-6 px-2">

        {/* LEFT SECTION */}
        <div className="col-span-2 space-y-6">
          <TodayCard />
          <CurrentWeather />
          <LookingAhead />
          <RadarMap />
          <RadarControls />
          <HourlyWeather />
          <TenDayWeather />
          <SunMoon />
          <AirQuality />
          <AllergyOutlook />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <TopStories />
          <FeaturedStories />
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}