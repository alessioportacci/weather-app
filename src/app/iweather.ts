// Per https://api.openweathermap.org/data/2.5/forecast
export interface IForecast
{
  cod: number,
  message: number,
  cnt: number,
  list: Ilist[],
  city:
  {
    id: number,
    name: string,
    coord:
    {
      lat: number,
      lon: number
    },
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number
  }
}

//Per https://api.openweathermap.org/data/2.5/weather
export interface IWeather
{
    coord:
    {
      lon: number
      lat: number
    },
    weather: Iweather [],
    base: string,
    main: Imain,
    visibility: number,
    wind: Iwind,
    rain:
    {
      "1h": number
    },
    clouds:
    {
      all: number
    },
    dt: number,
    sys:
    {
      type: number,
      id: number,
      country: string,
      sunrise: number,
      sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

//Per visualizzare
export interface ICity
{
  name:string,
  country: string,
  color: {background: string},
  list: Ilist[]
}

// Interfacce per pulizia codice
interface Iweather
{
  id: number,
  main: string,
  description: string,
  icon: string
}

interface Imain
{
  temp: number,
  feels_like: number
  temp_min: number,
  temp_max: number,
  pressure: number,
  sea_level: number,
  grnd_level: number,
  humidity: number,
  temp_kf: number
}

interface Iwind
{
  speed: number,
  deg: number,
  gust: number
}

interface Ilist
{
  dt: number,
  main:Imain,
  weather: Iweather[],
  clouds:
  {
    all: number
  }
  wind: Iwind
  visbility: number,
  pop: number,
  rain:
  {
    "3h": number
  },
  sys:
  {
    pod: string
  },
  dt_txt: string
}
