import sun from "../assets/sun.png";
import clouds from "../assets/bg.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";

function WeatherResult({ city, temp, wind, code }) {
  function getWeatherBackground(code) {
    if (code === 0) return sun;

    if (code >= 1 && code <= 3) return clouds;

    if (code >= 45 && code <= 67) return rain;

    if (code >= 71 && code <= 77) return snow;

    return clouds;
  }

  const background = getWeatherBackground(code);

  return (
    <div
      className="max-w-4xl h-96 mx-auto mt-10 rounded-xl bg-cover bg-center text-white shadow-xl"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="rounded-xl p-6">
        <h2 className="text-5xl font-bold mb-4 text-shadow-lg">Actuellement à {city}</h2>

        <div className="bg-blur text-5xl font-bold mb-4 mt-2 text-shadow-lg">{temp}°C</div>
        <div className="text-3xl font-bold mt-15 text-shadow-lg">
          <p>Vent : {wind} km/h</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-white to-transparent h-1/3 rounded-b-xl">

      </div>
    </div>
  );
}

export default WeatherResult;
