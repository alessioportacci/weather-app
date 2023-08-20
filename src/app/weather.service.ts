import { Injectable, OnInit } from '@angular/core';
import { ICity, IForecast, IWeather} from './iweather';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit
{
  //Url e key dell'API
  readonly APIurl = 'https://api.openweathermap.org/data/2.5/forecast'
  readonly AppId  = 'c54a271feffe7124ad77835b3efb2a9b'

  //Variabile su cui mi salvo la città corrente
  currentCity: ICity =
  {
    name: "",
    country: "",
    color: {background: ""},
    list: []
  }

  object: Object = { 'background-color': 'red'};

  constructor
  (
    private http: HttpClient,  //Per chiamate http
  )
  { }

  ngOnInit(): void
  {
    this.getWeather()
  }

  getWeather(city:string = "Rome")
  {
    return this.http.get<IForecast>(this.APIurl,
      {
        params:
        {
          q: city,
          appid: this.AppId,
          lang: "it",
          units: "metric"
        }
      }).pipe(tap(res =>
      {
        const currentDate = new Date().toISOString().substring(0, 10)
        const todayWeather = res.list.filter(e => e.dt_txt.includes(currentDate))
        console.log(todayWeather)
        this.currentCity =
        {
          name: res.city.name,
          country: res.city.country,
          color: {background: this.getWeatherColor(todayWeather[0].weather[0].main)},
          list: todayWeather
        }
        console.log(this.currentCity)
        //Se windows fosse stato compatibile con le emoji bandiera, sarebbe stato possibile farne apparire una
        console.log(this.getFlagEmoji("IT"))
      }))
  }

  getFlagEmoji(countryCode:string)
  {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  getWeatherColor(weather:string): string
  {
    weather = weather.toLocaleLowerCase()
    //Nuvoloso
    if (weather.includes( "clouds" ))
      return "linear-gradient(180deg, rgba(191,206,218,1) 0%, rgba(65,148,215,1) 100%);"
    //Pioggia
    if (weather.includes( "rain" ))
      return "linear-gradient(180deg, rgba(97,180,252,1) 0%, rgba(118,125,131,1) 100%)"
    //Temporale
      if (weather.includes( "thunderstorm" ))
        return "linear-gradient(180deg, rgba(47,134,209,1) 0%, rgba(73,78,83,1) 100%)"
    //Sole
    if (weather.includes( "clear" ))
      return "linear-gradient(180deg, rgba(199,231,255,1) 0%, rgba(65,148,215,1) 100%)"
    //Neve/Nebbia
    return "linear-gradient(180deg, rgba(240,248,255,1) 0%, rgba(118,125,131,1) 100%)"
  }

}


//Sole background: linear-gradient(180deg, rgba(251,255,157,1) 0%, rgba(240,255,66,1) 100%);
//Nuvole linear-gradient(180deg, rgba(244,245,228,1) 0%, rgba(125,126,115,1) 100%);
//Pioggia linear-gradient(180deg, rgba(199,231,255,1) 0%, rgba(65,148,215,1) 100%);
//Temporale
