//Di default
import { Injectable } from '@angular/core';
//
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
//Per utilizzare gli observable
import { Observable, map } from 'rxjs';
//Il nostro service
import { AuthServiceService } from './auth-service.service';

@Injectable
({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild
{
  constructor
  (
    private authSrv: AuthServiceService
  ){}

  //CanActivate che gestisce la possibilità di accedere o meno ad una pagina
  canActivate
  (
    route: ActivatedRouteSnapshot,   //Contiente le informazioni della rotta
    state: RouterStateSnapshot       //Rappresenta lo stato della rotta in un determinato momento
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.authSrv.isLoggedIn$
      .pipe(map(isLoggedIn => //Mi ripesco isLoggedIn$ (observable) al cui interno è presente un booleano
        {
          return isLoggedIn;  //Ottengo il dato al suo interno
        }));
  }

  //CanActivate che gestisce la possibilità di accedere o meno alle pagine child
  canActivateChild
  (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.canActivate(childRoute, state);
  }

}
