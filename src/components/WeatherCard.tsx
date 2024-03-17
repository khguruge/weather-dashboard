import { WeatherData } from "../types/WeatherData"

type weatherCardProps = {
  weatherData: WeatherData
  date: Date
  city?: string
}

/**
 * WeatherCard component displays weather information including temperature,
 * wind speed, humidity, and last updated time.
 *
 * @param {WeatherCardProps} props - Props for the WeatherCard component.
 * @returns {JSX.Element} JSX representation of the WeatherCard component.
 */
const WeatherCard = (props: weatherCardProps): JSX.Element => {
  return (
    <>
      <div className="weather-info">
        <p className="city">{props.weatherData.name}</p>
        {props.weatherData.weather.map((item, index) => (
          <div key={index} className="weather-data">
            <p className="temperature">{item.description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt=""
            />
          </div>
        ))}
        <span className="weather-data">
          Temperature: {props.weatherData.main.temp}°C
        </span>

        <div className="weather-data">
          <span>Wind Speed : {props.weatherData.wind.speed} </span>
          <span className="speed">km/h</span>
        </div>
        <div className="weather-data">
          <span>Humidity : {props.weatherData.main.humidity}%</span>
        </div>

        <div className="hint">
          {props.city === "" && WeatherCard !== null && (
            <p>This weather data is based on your current location.</p>
          )}
        </div>
        <div className="date">
          <p>Last Updated Time : {props.date.toLocaleString()}</p>
        </div>
      </div>
    </>
  )
}

export default WeatherCard
