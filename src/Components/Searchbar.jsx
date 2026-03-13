import { useState } from "react";
import { Search, MapPin } from "lucide-react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") onSearch(city.trim());
  };

  return (
    <div className="mx-auto mt-3 max-w-3xl">
      <div className="rounded-[24px] sm:rounded-[28px] border border-white/15 bg-white/10 p-2 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.18)]">
        {/* Mobile */}
        <div className="relative sm:hidden">
          <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />
          <input
            type="text"
            placeholder="Rechercher une ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-14 w-full rounded-2xl border border-transparent bg-white text-slate-900 pl-12 pr-14 text-base placeholder:text-slate-500 outline-none transition focus:border-slate-300"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Tablette + Desktop */}
        <div className="hidden sm:flex sm:flex-row sm:items-center gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />
            <input
              type="text"
              placeholder="Rechercher une ville..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="h-14 w-full rounded-2xl border border-transparent bg-black/20 pl-12 pr-4 text-base text-white placeholder:text-white/45 outline-none transition focus:border-white/15 focus:bg-black/25"
            />
          </div>

          <button
            onClick={handleSearch}
            className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white px-5 sm:px-6 font-medium text-slate-900 transition hover:scale-[1.02]"
          >
            <Search className="h-5 w-5" />
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;