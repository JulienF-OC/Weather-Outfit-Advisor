import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Star,
  MapPin,
} from "lucide-react";

function WeatherResult({
  city,
  displayCity,
  temp,
  wind,
  code,
  apparent,
  isFavorite,
  toggleFavorite,
}) {
  const isRain =
    (code >= 45 && code <= 67) || (code >= 80 && code <= 82);
  const isSnow = code >= 71 && code <= 77;
  const isWindy = wind >= 25;

  const getWeatherIcon = () => {
    if (code === 0) {
      return (
        <Sun className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-amber-300" />
      );
    }
    if (code >= 1 && code <= 3) {
      return (
        <Cloud className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white/90" />
      );
    }
    if (isRain) {
      return (
        <CloudRain className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-sky-200" />
      );
    }
    if (isSnow) {
      return (
        <CloudSnow className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-slate-100" />
      );
    }
    return (
      <Cloud className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white/90" />
    );
  };

  const getWeatherLabel = () => {
    if (code === 0) return "Ensoleillé";
    if (code >= 1 && code <= 3) return "Nuageux";
    if (isRain) return "Pluvieux";
    if (isSnow) return "Neigeux";
    return "Temps variable";
  };

  const getOutfit = () => {
    if (isSnow) {
      if (apparent <= -5) {
        return {
          outerwear: "Manteau épais",
          top: "Pull thermique",
          bottom: "Pantalon épais",
          shoes: "Bottes étanches",
          tip: "Temps très froid, couvre-toi bien avec bonnet, gants et chaussures isolantes.",
        };
      }

      return {
        outerwear: "Manteau chaud",
        top: "Pull chaud",
        bottom: "Pantalon",
        shoes: "Chaussures étanches",
        tip: "Temps neigeux, privilégie des vêtements chauds et des chaussures qui isolent bien.",
      };
    }

    if (isRain) {
      if (apparent <= 8) {
        return {
          outerwear: "Manteau imperméable",
          top: "Pull chaud",
          bottom: "Pantalon",
          shoes: "Chaussures étanches",
          tip: "Prends un parapluie ou une veste imperméable, la pluie et l’humidité refroidissent vite.",
        };
      }

      if (apparent <= 15) {
        return {
          outerwear: "Veste imperméable",
          top: "Pull léger",
          bottom: "Pantalon",
          shoes: "Chaussures étanches",
          tip: "Même si la température reste douce, la pluie demande une couche extérieure imperméable.",
        };
      }

      return {
        outerwear: isWindy ? "Coupe-vent imperméable" : "Veste imperméable légère",
        top: "T-shirt",
        bottom: "Léger",
        shoes: "Chaussures étanches",
        tip: "Temps doux mais pluvieux, privilégie surtout une protection contre la pluie.",
      };
    }

    if (apparent <= 0) {
      return {
        outerwear: "Manteau épais",
        top: "Pull thermique",
        bottom: "Pantalon épais",
        shoes: "Chaussures fermées",
        tip: "Le ressenti est très froid, privilégie plusieurs couches isolantes.",
      };
    }

    if (apparent <= 8) {
      return {
        outerwear: "Manteau",
        top: "Pull chaud",
        bottom: "Pantalon",
        shoes: "Chaussures fermées",
        tip: "Temps frais, un manteau et un haut chaud seront plus adaptés.",
      };
    }

    if (apparent <= 15) {
      return {
        outerwear: isWindy ? "Coupe-vent" : "Veste",
        top: "Pull léger",
        bottom: "Pantalon",
        shoes: "Chaussures fermées",
        tip: "Temps modéré, une veste ou un coupe-vent suffit généralement.",
      };
    }

    if (apparent <= 22) {
      return {
        outerwear: isWindy ? "Couche légère" : "Optionnelle",
        top: "T-shirt / pull fin",
        bottom: "Pantalon léger",
        shoes: "Confortables",
        tip: "Température agréable, garde éventuellement une couche légère si besoin.",
      };
    }

    return {
      outerwear: "Aucune",
      top: "T-shirt",
      bottom: "Très léger",
      shoes: "Légères",
      tip: "Temps chaud, privilégie une tenue légère et respirante.",
    };
  };

  const outfit = getOutfit();

  return (
    <section className="mx-auto mt-5 sm:mt-6 md:mt-10 max-w-6xl">
      <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[36px] border border-white/15 bg-white/10 p-4 sm:p-5 md:p-8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="relative z-10">
            {/* Mobile */}
            <div className="sm:hidden text-center">
              <div className="flex justify-center">
                <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs text-white/80">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate max-w-[180px]">
                    {displayCity || city}
                  </span>
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-white">
                {getWeatherLabel()}
              </h2>

              <div className="mt-5 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                  {getWeatherIcon()}
                </div>
              </div>

              <div className="mt-6 text-white">
                <div className="text-6xl font-bold tracking-tight">{temp}°</div>
                <p className="mt-2 text-sm text-white/65">
                  Température actuelle
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => toggleFavorite(city)}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium shadow-lg transition ${
                    isFavorite
                      ? "border border-red-300/20 bg-red-400/85 text-white hover:bg-red-400"
                      : "border border-amber-300/20 bg-amber-300/85 text-slate-950 hover:bg-amber-300"
                  }`}
                >
                  <Star
                    className="h-5 w-5"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                  <span className="text-sm">
                    {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  </span>
                </button>
              </div>

              {isFavorite && (
                <p className="mt-3 text-sm font-medium text-amber-200">
                  Cette ville est déjà dans vos favoris.
                </p>
              )}

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-sm text-white/70">
                    <Thermometer className="h-5 w-5" />
                    Ressenti
                  </div>
                  <div className="text-2xl font-semibold text-white">
                    {apparent}°C
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-sm text-white/70">
                    <Wind className="h-5 w-5" />
                    Vent
                  </div>
                  <div className="text-2xl font-semibold text-white">
                    {wind} km/h
                  </div>
                </div>
              </div>
            </div>

            {/* Tablette + Desktop */}
            <div className="hidden sm:flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/80">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="truncate">{displayCity || city}</span>
                  </p>

                  <h2 className="text-3xl md:text-5xl font-semibold text-white">
                    {getWeatherLabel()}
                  </h2>
                </div>

                <div className="flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
                  {getWeatherIcon()}
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-10">
                <div className="flex items-end justify-between gap-6">
                  <div className="text-white">
                    <div className="text-6xl md:text-8xl font-bold tracking-tight">
                      {temp}°
                    </div>
                    <p className="mt-2 text-sm md:text-base text-white/65">
                      Température actuelle
                    </p>
                  </div>

                  <button
                    onClick={() => toggleFavorite(city)}
                    className={`inline-flex w-auto items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium shadow-lg transition hover:scale-[1.02] ${
                      isFavorite
                        ? "border border-red-300/20 bg-red-400/85 text-white hover:bg-red-400"
                        : "border border-amber-300/20 bg-amber-300/85 text-slate-950 hover:bg-amber-300"
                    }`}
                  >
                    <Star
                      className="h-5 w-5"
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                    <span className="text-sm sm:text-base">
                      {isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"}
                    </span>
                  </button>
                </div>

                {isFavorite && (
                  <p className="text-sm font-medium text-amber-200">
                    Cette ville est déjà dans vos favoris.
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-md">
                    <div className="mb-2 flex items-center gap-2 text-sm md:text-base text-white/70">
                      <Thermometer className="h-5 w-5" />
                      Ressenti
                    </div>
                    <div className="text-3xl font-semibold text-white">
                      {apparent}°C
                    </div>
                  </div>

                  <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-md">
                    <div className="mb-2 flex items-center gap-2 text-sm md:text-base text-white/70">
                      <Wind className="h-5 w-5" />
                      Vent
                    </div>
                    <div className="text-3xl font-semibold text-white">
                      {wind} km/h
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="h-full rounded-[24px] sm:rounded-[28px] md:rounded-[36px] border border-white/15 bg-white/10 p-4 sm:p-5 md:p-6 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
          <div className="rounded-[20px] sm:rounded-[24px] md:rounded-[28px] border border-white/10 bg-black/20 p-4 sm:p-5 md:p-6 text-center sm:text-left">
            <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] md:tracking-[0.25em] text-white/55">
              Outfit advisor
            </p>

            <h3 className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-white">
              Tenue recommandée
            </h3>

            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                <span className="flex items-center gap-2">
                  <span className="text-lg">🧥</span>
                  <span className="text-sm md:text-base">
                    Couche extérieure
                  </span>
                </span>
                <span className="text-sm md:text-base font-medium text-white">
                  {outfit.outerwear}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👕</span>
                  <span className="text-sm md:text-base">Haut</span>
                </span>
                <span className="text-sm md:text-base font-medium text-white">
                  {outfit.top}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👖</span>
                  <span className="text-sm md:text-base">Bas</span>
                </span>
                <span className="text-sm md:text-base font-medium text-white">
                  {outfit.bottom}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👟</span>
                  <span className="text-sm md:text-base">Chaussures</span>
                </span>
                <span className="text-sm md:text-base font-medium text-white">
                  {outfit.shoes}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                Astuce du jour
              </p>
              <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">
                {outfit.tip}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default WeatherResult;