type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

type MainWeatherInfo = {
  temp: number
  humidity: number
}

type Wind = {
  speed: number
}

export type WeatherData = {
  name: string
  weather: Weather[]
  main: MainWeatherInfo
  wind: Wind
}
