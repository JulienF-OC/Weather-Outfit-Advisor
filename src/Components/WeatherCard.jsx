function WeatherCard({ city, temp, wind }) {

  return (
    <div className="w-64 h-80 rounded-xl bg-blue-200 shadow-md p-4 flex flex-col justify-center items-center">

      <h2 className="text-xl font-bold">{city}</h2>

      <p className="text-4xl">{temp}°C</p>

      <p>Vent : {wind} km/h</p>

    </div>
  );
}

export default WeatherCard;