import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Play, Menu, Navigation } from "lucide-react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentLocations, setRecentLocations] = useState([
    { name: "Cox's Bazar", region: "Chittagong", temp: 31, icon: "🌤" },
  ]);
  const [locationText, setLocationText] = useState("Cox's Bazar, Chittagong");
  const [temp, setTemp] = useState(31);
  const [weatherIcon, setWeatherIcon] = useState("🌤");
  const [searching, setSearching] = useState(false);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
        setSearchResults([]);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // User geolocation on load
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Unknown";
          const state = data.address.state_district || data.address.state || "";
          setLocationText(`${city}, ${state}`);
        } catch {}

        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`
          );
          const data = await res.json();
          setTemp(Math.round(data.current.temperature_2m));
          setWeatherIcon(getWeatherIcon(data.current.weathercode));
        } catch {}
      },
      () => {}
    );
  }, []);

  // Search debounce
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        // Search locations via Nominatim
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`
        );
        const data = await res.json();

        // Fetch weather for each result
        const results = await Promise.all(
          data.map(async (place) => {
            const name =
              place.address.city ||
              place.address.town ||
              place.address.village ||
              place.address.county ||
              place.display_name.split(",")[0];
            const region =
              place.address.state_district ||
              place.address.state ||
              place.address.country ||
              "";
            let t = null;
            let icon = "🌤";
            try {
              const wRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,weathercode`
              );
              const wData = await wRes.json();
              t = Math.round(wData.current.temperature_2m);
              icon = getWeatherIcon(wData.current.weathercode);
            } catch {}
            return { name, region, temp: t, icon, lat: place.lat, lon: place.lon };
          })
        );
        setSearchResults(results);
      } catch {}
      setSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if (code <= 2) return "🌤";
    if (code <= 3) return "☁️";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    return "⛈️";
  }

  function handleSelectLocation(loc) {
    setLocationText(`${loc.name}, ${loc.region}`);
    if (loc.temp !== null) setTemp(loc.temp);
    setWeatherIcon(loc.icon);
    // Add to recent
    setRecentLocations((prev) => {
      const filtered = prev.filter((r) => r.name !== loc.name);
      return [loc, ...filtered].slice(0, 3);
    });
    setSearchOpen(false);
    setQuery("");
    setSearchResults([]);
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Unknown";
        const state = data.address.state_district || data.address.state || "";
        const wRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`
        );
        const wData = await wRes.json();
        const t = Math.round(wData.current.temperature_2m);
        const icon = getWeatherIcon(wData.current.weathercode);
        setLocationText(`${city}, ${state}`);
        setTemp(t);
        setWeatherIcon(icon);
        setRecentLocations((prev) => {
          const loc = { name: city, region: state, temp: t, icon };
          const filtered = prev.filter((r) => r.name !== city);
          return [loc, ...filtered].slice(0, 3);
        });
      } catch {}
      setSearchOpen(false);
    });
  }

  const showDropdown = searchOpen && (query.trim() === "" || searchResults.length > 0 || searching);

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      {/* TOP BAR */}
      <div className="bg-black text-gray-400 px-12 h-[32px] flex items-center gap-5 text-[13px]">
        <span className="text-white font-semibold">For Business</span>
        <span>|</span>
        <span>Warnings</span>
        <span>Data Suite</span>
        <span>Forensics</span>
        <span>Advertising</span>
        <span>Superior Accuracy™</span>
      </div>

      {/* MAIN NAV */}
      <div className="bg-[#2b2b2b] px-12 h-[64px] flex items-center justify-between text-white">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <h1 className="text-[20px] font-semibold tracking-wide">AccuWeather</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-[14px]">
            <span>{locationText} {temp}°c</span>
            <span className="text-yellow-400 text-[18px]">{weatherIcon}</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* SEARCH BOX */}
          <div ref={searchRef} className="relative flex items-center bg-white rounded-md overflow-visible w-[360px] h-[38px]">
            <div className="px-3 text-gray-500">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              className="flex-1 text-black text-sm outline-none bg-transparent"
            />
            <div className="w-[1px] h-[60%] bg-gray-300" />

            {/* LOCATION BUTTON */}
            <div ref={dropdownRef} className="relative h-full flex items-center">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 text-black text-sm h-full"
              >
                Location <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-[42px] w-[160px] bg-white text-black rounded-md shadow-lg py-1 text-sm z-50">
                  <div className="px-4 py-2 hover:bg-gray-100 flex justify-between cursor-pointer">
                    <span>Location</span>
                    <span className="text-orange-500 font-bold">✓</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">News</div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Videos</div>
                </div>
              )}
            </div>

            {/* SEARCH DROPDOWN */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-[42px] bg-white text-black rounded-md shadow-xl z-50 overflow-hidden border border-gray-100">
                {/* Use Current Location */}
                <div
                  onClick={handleUseCurrentLocation}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                >
                  <Navigation size={15} className="text-gray-500 fill-gray-500" />
                  <span className="text-[13px] font-medium">Use Current Location</span>
                </div>

                {/* Searching spinner */}
                {searching && (
                  <div className="px-4 py-3 text-[12px] text-gray-400">Searching...</div>
                )}

                {/* Search Results */}
                {!searching && searchResults.length > 0 && (
                  <div>
                    {searchResults.map((loc, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectLocation(loc)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
                      >
                        <div>
                          <p className="text-[14px] font-semibold">{loc.name}</p>
                          <p className="text-[12px] text-gray-400">{loc.region}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[18px]">{loc.icon}</span>
                          {loc.temp !== null && (
                            <span className="text-[14px] font-medium text-gray-700">{loc.temp}°</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recent Locations */}
                {!searching && query.trim() === "" && recentLocations.length > 0 && (
                  <div>
                    <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                      Recent
                    </p>
                    {recentLocations.map((loc, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectLocation(loc)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-50"
                      >
                        <div>
                          <p className="text-[14px] font-semibold">{loc.name}</p>
                          <p className="text-[12px] text-gray-400">{loc.region}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[18px]">{loc.icon}</span>
                          {loc.temp !== null && (
                            <span className="text-[14px] font-medium text-gray-700">{loc.temp}°</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Play size={18} className="text-gray-300 cursor-pointer" />
          <Menu size={20} className="text-gray-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}