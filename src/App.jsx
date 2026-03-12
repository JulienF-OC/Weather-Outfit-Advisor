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
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    );

    const weatherData = await weatherResponse.json();

    setWeather({
      city: name,
      temp: weatherData.current_weather.temperature,
      wind: weatherData.current_weather.windspeed,
      code: weatherData.current_weather.weathercode,
    });
  };

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
        />
      )}
    </div>
  );
}

export default App;
