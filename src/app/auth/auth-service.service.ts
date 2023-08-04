//Di default già presente
import { Injectable } from '@angular/core';
//Le interfacce che abbiamo creato
import { IRegister, ILogin, IAccessData } from './auth-interfaces'
//Per effettuare le chiamate crud
import { HttpClient } from '@angular/common/http';
//Per usare e gestire le jwt
import { JwtHelperService } from '@auth0/angular-jwt';
//Per giocare con le Pipe
import { BehaviorSubject, map, tap } from 'rxjs';
//Per reindirizzare l'utente
import { Router } from '@angular/router';


@Injectable
({
  providedIn: 'root'
})
export class AuthServiceService
{
  //Urls
  apiUrl:string = 'http://localhost:3000';         //Url di json-server
  registerUrl:string = this.apiUrl + '/register';  //Url di json-server per registrazione
  loginUrl:string = this.apiUrl + '/login';        //Url di json-server per login

  //Jwt
  private jwtHelper:JwtHelperService = new JwtHelperService();          //Istanza di JwtHelperService che ci permette di lavorare con i json web token
  autoLogoutTimer:any;                                                  //Riferimento al timer che slogga l'utente quando il jwt è scaduto

  //Auth
  private authSubject = new BehaviorSubject<null | IAccessData>(null);  //Campo che rappresenta l'utente loggato (di default non è loggato)
  user$               = this.authSubject.asObservable();                //Campo contenente le informazioni dell'utente loggato
  isLoggedIn$         = this.user$.pipe(map(user => !!user));           //Campo che rappresenta lo stato attuale del login (boolean)

  constructor
  (
    private http: HttpClient,  //Per chiamate http
    private router: Router,    //Per effettuare redirect
  )
  {
    //Controllo se siamo in una sessione
    this.restoreUser()
  }

  //Metodo per effettuare registrazione di un nuovo utente
  signUp(registerData:IRegister)
  {
    return this.http.post<IAccessData>(this.registerUrl, registerData)
  }

  //Metodo per effettuare il login
  login(dataLogin:ILogin)
  {
    return this.http.post<IAccessData>(this.loginUrl, dataLogin)
    .pipe
    (tap(data =>
      {
        //Aggiorno il subject con lo stato dello user
        this.authSubject.next(data);
        //Salvo lo user per poterlo recuperare in ogni situazione
        localStorage.setItem('accessData', JSON.stringify(data));

        //Imposto immediatamente l'auto logout una volta che siamo dentro
        const expDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
        this.autoLogout(expDate)
      })
    )
  }

  //Metodo che controllo se lo user è già loggato al caricamento della pagina
  restoreUser()
  {
    //Recupero i dati di accesso dell'utente
    const userJson:string|null = localStorage.getItem('accessData');
    if(!userJson) return //Se non sono presenti, blocco la funzione

    //Quindi converto la stringa (che conteneva un json) in oggetto
    const accessData:IAccessData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return //Se il token è scaduto, fermo tutto

    this.authSubject.next(accessData);  //Aggiorno il authsubject con i dati della sessione
  }

  //Metodo per effettuare il logout
  logout()
  {
    this.authSubject.next(null)            //Comunico all'authSubject che il valore da propagare adesso è null
    localStorage.removeItem('accessData')  //Elimino i dati salvati dal localstorage
    this.router.navigate(['/login'])       //Redirect al login
  }

  //Metodo per effettuare un logout dopo x tempo
  autoLogout(expDate:Date)
  {
    /*Calcolo i millisecondi che servono per il logout
     *Per farlo, sottraggo i ms della data attuale da quelli della data del jwt */
    const expMs = expDate.getTime() - new Date().getTime();
    //Avvio un timer che effettuerà il logout in base ai ms ottenuti
    this.autoLogoutTimer = setTimeout(() =>
    {
      this.logout()
    }, expMs)
  }
}
