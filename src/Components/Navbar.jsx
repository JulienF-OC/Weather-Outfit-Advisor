import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Star, Trash2 } from "lucide-react";

function Navbar({ favorites, onSelectFavorite, onRemoveFavorite, onReset }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mx-auto relative z-50 flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
      <div
  onClick={onReset}
  className="flex items-center gap-3 cursor-pointer"
>
  <div className="shrink-0 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-md">
    <img
      src={Logo}
      alt="Weather Outfit Advisor logo"
      className="h-10 w-10 object-contain"
    />
  </div>

  <h1 className="text-lg sm:text-base md:text-lg lg:text-xl font-bold text-white">
    Weather Outfit Advisor
  </h1>
</div>

      <div className="relative shrink-0">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 md:px-4 md:py-2.5 text-sm text-white backdrop-blur-md transition hover:bg-white/15"
        >
          <Star className="h-4 w-4" />
          <span className="hidden sm:inline">Favoris</span>
          <span className="min-w-6 rounded-full bg-amber-300 px-2 py-0.5 text-center text-xs font-semibold text-slate-900">
            {favorites.length}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-[60] mt-3 w-[92vw] max-w-[340px] sm:w-80 rounded-3xl border border-white/15 bg-slate-950/95 p-3 backdrop-blur-xl shadow-2xl">
            <h2 className="px-3 py-2 text-sm font-medium text-white/70">
              Mes villes favorites
            </h2>

            {favorites.length === 0 ? (
              <p className="px-3 py-4 text-sm text-white/50">
                Aucun favori pour le moment.
              </p>
            ) : (
              <div className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
                {favorites.map((city) => (
                  <div
                    key={city}
                    className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 px-3 py-3"
                  >
                    <button
                      onClick={() => {
                        onSelectFavorite(city);
                        setOpen(false);
                      }}
                      className="min-w-0 flex-1 truncate text-left text-sm text-white transition hover:text-amber-300"
                    >
                      {city}
                    </button>

                    <button
                      onClick={() => onRemoveFavorite(city)}
                      className="shrink-0 rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-red-400"
                      aria-label={`Supprimer ${city} des favoris`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;