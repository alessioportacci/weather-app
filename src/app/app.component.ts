import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  searchCityForm!: FormGroup;

  constructor
  (
    private weatherSrv:WeatherService
  )
  {}

  ngOnInit(): void
  {
    this.searchCityForm = new FormGroup
    (
      {
        nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      }
    )
  }

  searchCity()
  {
    this.weatherSrv.getWeather(this.searchCityForm.get('nome')?.value).subscribe()
  }
}
