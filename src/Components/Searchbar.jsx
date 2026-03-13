import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") onSearch(city.trim());
  };

  return (
    <div className="flex justify-center mt-12 w-full">

      <div className="relative w-full max-w-lg">

        {/* Input */}
        <input
          type="text"
          placeholder="Rechercher une ville..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-32 text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />

        {/* Icône */}
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />

        {/* Bouton */}
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Rechercher
        </button>

      </div>

    </div>
  );
}

export default SearchBar;