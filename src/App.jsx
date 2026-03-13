import { useState } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/Searchbar";
import WeatherBackground from "./Components/WeatherBackground";
import WeatherResult from "./Components/WeatherResult";
import Footer from "./Components/Footer";

function App() {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );

  const searchCity = async (city) => {
    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`,
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) return;

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code`,
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        displayCity: `${name}${country ? `, ${country}` : ""}`,
        temp: Math.round(weatherData.current.temperature_2m),
        wind: Math.round(weatherData.current.wind_speed_10m),
        code: weatherData.current.weather_code,
        apparent: Math.round(weatherData.current.apparent_temperature),
      });
    } catch (error) {
      console.error("Erreur météo :", error);
    }
  };

  const resetWeather = () => {
    setWeather(null);
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
              <div className="w-full max-w-xl">
                <SearchBar onSearch={searchCity} />
              </div>
            </div>
          ) : (
            <>
              <SearchBar onSearch={searchCity} />

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
