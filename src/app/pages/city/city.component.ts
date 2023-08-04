import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import { IFavorites } from './ifavorites';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit
{

  readonly FavoritesURL:string = 'http://localhost:3000/favorites'

  constructor
  (
    public weatherSrv:WeatherService,
    private http: HttpClient  //Per chiamate http
  )
  {}

  ngOnInit(): void
  {
  }

  addToFavorite(city?:string)
  {
    console.log(city)
    return this.http.post<IFavorites>(this.FavoritesURL, {id:1, cityName: city}).subscribe()
  }
}
