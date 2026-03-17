import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/Searchbar";
import WeatherBackground from "./Components/WeatherBackground";
import WeatherResult from "./Components/WeatherResult";
import Footer from "./Components/Footer";

function App() {
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const searchCity = async (city) => {
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      );

      if (!geoResponse.ok) {
        throw new Error("Erreur lors de la recherche de la ville.");
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setLocationError("Ville introuvable. Essayez une autre recherche.");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code`
      );

      if (!weatherResponse.ok) {
        throw new Error("Erreur lors de la récupération de la météo.");
      }

      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        displayCity: `${name}${country ? `, ${country}` : ""}`,
        temp: Math.round(weatherData.current.temperature_2m),
        wind: Math.round(weatherData.current.wind_speed_10m),
        code: weatherData.current.weather_code,
        apparent: Math.round(weatherData.current.apparent_temperature),
      });

      setLocationError("");
    } catch (error) {
      console.error("Erreur météo :", error);
      setLocationError("Impossible de récupérer la météo pour cette ville.");
    }
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      setLocationError("");

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code`
      );

      if (!weatherResponse.ok) {
        throw new Error("Erreur lors de la récupération de la météo.");
      }

      const weatherData = await weatherResponse.json();

      let cityName = "Votre position";
      let countryName = "";

      try {
        const reverseGeoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
        );

        if (reverseGeoResponse.ok) {
          const reverseGeoData = await reverseGeoResponse.json();
          cityName = reverseGeoData.results?.[0]?.name || "Votre position";
          countryName = reverseGeoData.results?.[0]?.country || "";
        }
      } catch (error) {
        console.error("Erreur reverse geocoding :", error);
      }

      setWeather({
        city: cityName,
        displayCity: `${cityName}${countryName ? `, ${countryName}` : ""}`,
        temp: Math.round(weatherData.current.temperature_2m),
        wind: Math.round(weatherData.current.wind_speed_10m),
        code: weatherData.current.weather_code,
        apparent: Math.round(weatherData.current.apparent_temperature),
      });
    } catch (error) {
      console.error("Erreur météo géolocalisée :", error);
      setLocationError(
        "Impossible de récupérer votre position automatiquement. Recherchez une ville."
      );
    } finally {
      setIsLocating(false);
    }
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationError(
        "La géolocalisation n’est pas prise en charge par votre navigateur."
      );
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);

        if (error.code === 1) {
          setLocationError(
            "Vous avez refusé la géolocalisation. Recherchez une ville."
          );
        } else if (error.code === 2) {
          setLocationError("Position introuvable. Recherchez une ville.");
        } else if (error.code === 3) {
          setLocationError(
            "La demande de géolocalisation a expiré. Recherchez une ville."
          );
        } else {
          setLocationError(
            "Impossible de récupérer votre position. Recherchez une ville."
          );
        }

        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  const resetWeather = () => {
    setWeather(null);
    setLocationError("");
    setIsLocating(true);

    if (!("geolocation" in navigator)) {
      setLocationError(
        "La géolocalisation n’est pas prise en charge par votre navigateur."
      );
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);

        if (error.code === 1) {
          setLocationError(
            "Vous avez refusé la géolocalisation. Recherchez une ville."
          );
        } else if (error.code === 2) {
          setLocationError("Position introuvable. Recherchez une ville.");
        } else if (error.code === 3) {
          setLocationError(
            "La demande de géolocalisation a expiré. Recherchez une ville."
          );
        } else {
          setLocationError(
            "Impossible de récupérer votre position. Recherchez une ville."
          );
        }

        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFavorite = (city) => {
    const updated = favorites.filter((fav) => fav !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const toggleFavorite = (city) => {
    if (favorites.includes(city)) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

  const isFavorite = weather ? favorites.includes(weather.city) : false;

  return (
    <WeatherBackground code={weather?.code} weatherLoaded={!!weather}>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar
          favorites={favorites}
          onSelectFavorite={searchCity}
          onRemoveFavorite={removeFavorite}
          onReset={resetWeather}
        />

        <main className="flex-1 px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
          {!weather ? (
            <div className="flex h-full items-center justify-center">
              <div className="w-full max-w-xl text-center">
                <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                  Quel temps fait-il chez vous ?
                </h2>

                <p className="mb-8 text-sm sm:text-base text-white/70 leading-relaxed">
                  Découvrez la météo et la tenue idéale pour aujourd’hui.
                </p>

                <SearchBar onSearch={searchCity} />

                {isLocating && !locationError && (
                  <p className="mt-4 text-center text-sm text-white/70">
                    Détection de votre position...
                  </p>
                )}

                {!!locationError && (
                  <p className="mt-4 text-center text-sm text-red-400">
                    {locationError}
                  </p>
                )}

                <div className="mt-10 grid gap-4 sm:grid-cols-3 text-center">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-lg">
                    <div className="mb-2 text-2xl">📍</div>
                    <p className="font-medium text-white">Localisation</p>
                    <p className="mt-1 text-sm text-white/70">
                      Détectez automatiquement la météo autour de vous.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-lg">
                    <div className="mb-2 text-2xl">⭐</div>
                    <p className="font-medium text-white">Favoris</p>
                    <p className="mt-1 text-sm text-white/70">
                      Enregistrez vos villes préférées facilement.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-lg">
                    <div className="mb-2 text-2xl">👕</div>
                    <p className="font-medium text-white">Tenue conseillée</p>
                    <p className="mt-1 text-sm text-white/70">
                      Recevez des conseils selon la météo du jour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <SearchBar onSearch={searchCity} />

              {!!locationError && (
                <p className="mt-4 text-center text-sm text-red-400">
                  {locationError}
                </p>
              )}

              <WeatherResult
                city={weather.city}
                displayCity={weather.displayCity}
                temp={weather.temp}
                wind={weather.wind}
                code={weather.code}
                apparent={weather.apparent}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            </>
          )}
        </main>

        <Footer />
      </div>
    </WeatherBackground>
  );
}

export default App;