import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") onSearch(city.trim());
  };

  return (
  <div className="flex justify-center mt-6 w-full">
  <div className="relative w-full max-w-md">
    {/* Input */}
    <input
      type="text"
      placeholder="Rechercher une ville.."
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="bg-white w-full border border-gray-300 rounded-xl py-3 pl-12 pr-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Icône loupe */}
    <Search className="w-5 h-5 text-blue-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />

    {/* Bouton */}
    <button
      onClick={handleSearch}
      className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Rechercher
    </button>
  </div>
</div>
  );
}

export default SearchBar;