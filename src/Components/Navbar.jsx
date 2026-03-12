import Logo from "../assets/Logo.png";
import { Star } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-transparent p-4 flex justify-between items-center text-white border-b border-gray-200">
      <div className="flex items-center space-x-2 ml-10">
        <img
          src={Logo}
          alt="Soleil jaune caché derrière un nuage bleu avec une doudoune devant ces derniers."
          className="w-17 h-10"
        />
        <h1 className="font-bold text-xl text-shadow-lg">Weather Outfit Advisor</h1>
      </div>
      <div className="flex gap-10 mr-10">
      <button className="bg-blue-600 text-white px-4 py-1 rounded flex items-center space-x-1 rounded-lg hover:bg-blue-500 cursor-pointer transition-colors duration-200">
        <Star className="text-yellow-400 w-5 h-5" fill="currentColor" />
        <span>Favoris</span>
      </button>
      <button className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded space-x-1 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200">
        <span>Ajouter à mes favoris</span>
      </button>
      </div>
    </nav>
  );
}

export default Navbar;
