import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { IFavorites } from '../city/ifavorites';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit
{
  //Url
  favoritesUrl:string = 'http://localhost:3000/favorites'; //Url di json-server
  favoritesList?:IFavorites[]

  constructor
  (
    private http:HttpClient
  ){}

  ngOnInit(): void
  {
    this.getFavorites()
  }

  getFavorites()
  {
    this.http.get<IFavorites[]>(this.favoritesUrl)
    .pipe(tap(res => this.favoritesList = res.filter((fav) => fav.userId == 2)))
      .subscribe()
  }
}
