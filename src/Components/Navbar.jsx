import Logo from "../assets/Logo.png";
import { Star } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 px-10 py-3 flex justify-between items-center">

      {/* Logo + titre */}
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Weather Outfit Advisor logo"
          className="w-10 h-10"
        />
        <h1 className="font-semibold text-lg text-slate-900">
          Weather Outfit Advisor
        </h1>
      </div>

      {/* Boutons */}
      <div className="flex items-center gap-4">

        <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">
          <Star className="w-4 h-4" fill="currentColor"/>
          Favoris
        </button>

        <button className="px-4 py-1.5 text-slate-600 hover:text-blue-600 transition">
          Ajouter à mes favoris
        </button>

      </div>

    </nav>
  );
}

export default Navbar;