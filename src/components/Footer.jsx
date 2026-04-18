export default function Footer() {
  return (
    <div className="bg-[#f5f5f5] mt-10 border-t text-[13px] text-gray-700">

      {/* BREADCRUMB */}
      <div className="max-w-[1100px] mx-auto px-5 py-4 text-gray-500">
        World › Asia › Bangladesh › Chittagong › Cox's Bazar
      </div>

      {/* NEARBY */}
      <div className="max-w-[1100px] mx-auto px-5 pb-4 text-[13px] text-gray-500">
        <span className="font-medium text-gray-600">
          Weather Near Cox's Bazar:
        </span>{" "}
        Chakaria, Chittagong; Ramu, Chittagong; Ukhia, Chittagong
      </div>

      {/* MAIN GRID */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-4 gap-12 px-5 py-6">

        {/* COMPANY */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">COMPANY</h3>
          <ul className="space-y-2">
            <li>Proven Superior Accuracy™</li>
            <li>About AccuWeather</li>
            <li>Digital Advertising</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact Us</li>
          </ul>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-5">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              f
            </div>
            <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white">
              t
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">
            PRODUCTS & SERVICES
          </h3>
          <ul className="space-y-2">
            <li>For Business</li>
            <li>For Partners</li>
            <li>For Advertising</li>
            <li>AccuWeather APIs</li>
            <li>AccuWeather Connect</li>
            <li>Personal Weather Stations</li>
          </ul>
        </div>

        {/* APPS */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">
            APPS & DOWNLOADS
          </h3>
          <ul className="space-y-2">
            <li>iPhone App</li>
            <li>Android App</li>
            <li>See all Apps & Downloads</li>
          </ul>

          <h3 className="font-semibold mt-5 mb-2 text-gray-800">
            SUBSCRIPTION SERVICES
          </h3>
          <ul className="space-y-2">
            <li>AccuWeather Premium</li>
            <li>AccuWeather Professional</li>
          </ul>
        </div>

        {/* MORE */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">MORE</h3>
          <ul className="space-y-2">
            <li>AccuWeather Ready</li>
            <li>Business</li>
            <li>Health</li>
            <li>Hurricane</li>
            <li>Leisure and Recreation</li>
            <li>Severe Weather</li>
            <li>Space and Astronomy</li>
            <li>Sports</li>
            <li>Travel</li>
            <li>Weather News</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t text-center text-[12px] text-gray-500 py-6 px-4">
        © 2026 AccuWeather, Inc. "AccuWeather" and sun design are registered
        trademarks of AccuWeather, Inc. All Rights Reserved.
        <div className="mt-2">
          Terms of Use | Privacy Policy | Cookie Policy | Data Sources
        </div>
      </div>

    </div>
  );
}