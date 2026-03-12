import WeatherCard from "./WeatherCard";

function Cards({ data }) {

  if (!data) return null;

  return (
    <div className="flex justify-center mt-10">
      <WeatherCard
        city={data.city}
        temp={data.temp}
        wind={data.wind}
      />
    </div>
  );
}

export default Cards;