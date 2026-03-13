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
    if ((code >= 45 && code <= 67) || (code >= 80 && code <= 82)) {
      return (
        <CloudRain className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-sky-200" />
      );
    }
    if (code >= 71 && code <= 77) {
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
    if ((code >= 45 && code <= 67) || (code >= 80 && code <= 82))
      return "Pluvieux";
    if (code >= 71 && code <= 77) return "Neigeux";
    return "Temps variable";
  };

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
                  {(code >= 45 && code <= 67) || (code >= 80 && code <= 82)
                    ? "Imperméable"
                    : apparent <= 10
                      ? "Manteau"
                      : "Optionnelle"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👕</span>
                  <span className="text-sm md:text-base">Haut</span>
                </span>
                <span className="text-sm md:text-base font-medium text-white">
                  {apparent <= 0
                    ? "Manteau épais"
                    : apparent <= 8
                      ? "Manteau"
                      : apparent <= 15
                        ? "Veste"
                        : apparent <= 22
                          ? "Pull léger"
                          : "T-shirt"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👖</span>
                  <span className="text-sm md:text-base">Bas</span>
                </span>
                <span className="text-sm md:text-base font-medium text-white">
                  {apparent <= 10 ? "Pantalon" : "Léger"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👟</span>
                  <span className="text-sm md:text-base">Chaussures</span>
                </span>
                <span className="text-sm md:text-base font-medium text-white">
                  {(code >= 45 && code <= 67) || (code >= 80 && code <= 82)
                    ? "Étanches"
                    : "Confortables"}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                Astuce du jour
              </p>
              <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">
                {wind >= 25
                  ? "Le vent est soutenu, prévois une couche coupe-vent."
                  : code >= 71 && code <= 77
                    ? "Temps froid, privilégie des vêtements bien isolants."
                    : (code >= 45 && code <= 67) || (code >= 80 && code <= 82)
                      ? "Pense à prendre un parapluie ou une veste imperméable."
                      : "Temps plutôt agréable, privilégie une tenue légère et confortable."}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default WeatherResult;
