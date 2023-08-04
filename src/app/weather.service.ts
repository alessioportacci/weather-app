import { Injectable, OnInit } from '@angular/core';
import { ICity, IWeather} from './iweather';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {

  //Url e key dell'API
  readonly APIurl = 'https://api.openweathermap.org/data/2.5/weather'
  readonly AppId  = 'c54a271feffe7124ad77835b3efb2a9b'

  //Variabile su cui mi salvo la città corrente
  currentCity?: ICity

  constructor
  (
    private http: HttpClient,  //Per chiamate http
  )
  { }

  ngOnInit(): void
  {
    this.getWheater()
  }

  getWheater(city:string = "Rome")
  {
    return this.http.get<IWeather>(this.APIurl,
      {
        params:
        {
          q: city,
          appid: this.AppId,
        }
      }).pipe(tap(res =>
      {
        console.log(res)
        this.currentCity =
        {
          name: res.name,
          country: res.sys.country,
          weather: res.weather[0].main,
          temp: res.main.temp - 273.15,
          maxTemp: res.main.temp_max - 273.15,
          minTemp: res.main.temp_min - 273.15,
          humidity: res.main.humidity,
          windSpeed: res.wind.speed
        }
        console.log(this.currentCity)
      }))
  }
}
