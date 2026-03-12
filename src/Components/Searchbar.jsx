import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if(city.trim() !== "") onSearch(city.trim());
    setCity("");
  };

  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Entrer une ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border border-gray-300 rounded-l-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-1 rounded-r-lg hover:bg-blue-600 transition-colors"
      >
        Rechercher
      </button>
    </div>
  );
}

export default SearchBar;