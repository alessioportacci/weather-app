import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CityComponent } from './pages/city/city.component';

const routes: Routes =
[
  {
    path: '', component:HomeComponent
  },
  {
    path: 'city', component: CityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
