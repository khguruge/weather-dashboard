import { FormEvent, useEffect, useState } from "react"
import { useGeolocation } from "../hooks/useGeolocation"
import { WeatherData } from "../types/WeatherData"
import WeatherCard from "../components/WeatherCard"
import "../assets/css/weather.css"

/**
 * DashboardPage component displays weather information and allows users to fetch weather data for a specific city.
 */
const DashboardPage = () => {
  const { location } = useGeolocation()
  const [weatherData, setWeatherData] = useState<WeatherData | null>()
  const [weatherDataError, setWeatherDataError] = useState<string | null>(null)
  const [city, setCity] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [date, setDate] = useState<Date>(new Date())

  /**
   * Handles form submission to fetch weather data for the entered city.
   * @param {FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const cityName = (formData.get("city") as string).trim()
    setCity(cityName)
    fetchData(cityName)
  }

  /**
   * Fetches weather data from the API based on the provided city name or geolocation coordinates.
   * @param {string} [city] - The city name to fetch weather data for.
   */
  const fetchData = async (city?: string) => {
    try {
      setWeatherDataError(null)
      setWeatherData(null)
      setLoading(true)

      if (!(city || (location.latitude && location.longitude))) {
        setWeatherDataError("Enter your city or or allow location access")
        throw new Error("City or latitude and longitude are required")
      }
      // Construct params object based on provided props
      const params = {
        appid: import.meta.env.VITE_APP_API_KEY as string,
        units: "metric",
        ...(city
          ? { q: city }
          : { lat: `${location.latitude}`, lon: `${location.longitude}` }),
      }

      // Construct URL with query parameters
      const queryString = new URLSearchParams(params).toString()
      const url = `${
        import.meta.env.VITE_APP_BASE_URL as string
      }?${queryString}`

      // Fetch weather data
      const response = await fetch(url)

      // Check if response is successful
      if (!response.ok) {
        if (response.status === 404) {
          setWeatherDataError("City not found")
        } else {
          setWeatherDataError("Something went wrong")
        }
        throw new Error("Network response was not ok")
      }

      // Parse response JSON
      const data = await response.json()
      setWeatherData(data)
      setDate(new Date())
      setLoading(false)
    } catch (error) {
      // Handle errors
      console.log(
        "There was a problem with the request:",
        (error as Error).message
      )
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [location.latitude, location.longitude])

  return (
    <div className="weather-card">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="city"
          placeholder="Enter city name"
          className="input"
        />
        <button type="submit" className="button">
          Get Weather
        </button>
      </form>
      {loading && (
        <div className="flex-box">
          <div className="loader"></div>
        </div>
      )}
      {weatherDataError && !loading && (
        <div className="flex-box">
          <p>{weatherDataError}</p>
        </div>
      )}
      {weatherData && !loading && (
        <WeatherCard weatherData={weatherData} date={date} city={city} />
      )}
    </div>
  )
}

export default DashboardPage
