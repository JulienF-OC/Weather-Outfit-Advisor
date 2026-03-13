import sun from "../assets/sun.png";
import clouds from "../assets/bg.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import { getAdvice } from "../utils/getAdvice";

function WeatherResult({ city, temp, wind, code, apparent }) {
  function getWeatherBackground(code) {
    if (code === 0) return sun;

    if (code >= 1 && code <= 3) return clouds;

    if ((code >= 45 && code <= 67) || (code >= 80 && code <= 82)) return rain;

    if (code >= 71 && code <= 77) return snow;

    return clouds;
  }

  const background = getWeatherBackground(code);

  return (
    <div
      className="max-w-4xl h-96 mx-auto mt-10 rounded-xl bg-cover bg-center text-white shadow-xl relative overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* contenu */}
      <div className="relative p-8">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
          Actuellement à {city}
        </h2>

        <div className="text-6xl font-bold mb-4 drop-shadow-lg">{temp}°C</div>
        <p className="text-xl font-medium drop-shadow-lg">
          Ressenti : {apparent}°C
        </p>

        <p className="text-xl font-medium drop-shadow-lg">Vent : {wind} km/h</p>
      </div>

      {/* bande blanche */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white/90 backdrop-blur-sm rounded-b-xl flex items-center px-8 text-slate-800 font-medium">
        Nous vous conseillons de porter : {getAdvice(temp)}
      </div>
      
    </div>
    
  );
}

export default WeatherResult;
