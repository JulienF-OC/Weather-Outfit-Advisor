import { useState } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/Searchbar";
import WeatherResult from "./Components/WeatherResult";

function App() {
  const [weather, setWeather] = useState(null);

  const searchCity = async (city) => {
    // API géolocalisation
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
    );

    const geoData = await geoResponse.json();

    if (!geoData.results) return;

    const { latitude, longitude, name } = geoData.results[0];

    // API météo
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code`,
    );
    const weatherData = await weatherResponse.json();

    setWeather({
      city: name,
      temp: weatherData.current.temperature_2m,
      wind: weatherData.current.wind_speed_10m,
      code: weatherData.current.weather_code,
      apparent: weatherData.current.apparent_temperature,
    });
  };

  const [favorites, setFavorites] = useState(
  JSON.parse(localStorage.getItem("favorites")) || []
);

function addFavorite(city) {
  if (!favorites.includes(city)) {
    const updated = [...favorites, city];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }
}

  return (
    <div>
      <Navbar />
      <SearchBar onSearch={searchCity} />

      {weather && (
        <WeatherResult
          city={weather.city}
          temp={weather.temp}
          wind={weather.wind}
          code={weather.code}
          apparent={weather.apparent}
          addFavorite={addFavorite}
        />
      )}
    </div>
  );
}

export default App;
