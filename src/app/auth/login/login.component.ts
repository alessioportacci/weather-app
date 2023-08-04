import { Component, OnInit } from '@angular/core';
import { ILogin } from '../auth-interfaces';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  formLogin!: FormGroup;

  constructor
  (
    private authSrv: AuthServiceService,
    private router:Router
  )
  {}
  ngOnInit(): void
  {
    this.formLogin = new FormGroup
    ({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }

  onSubmit()
  {
    //Mi creo l'oggetto da passare al login
    const loginData:ILogin =
    {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value
    }

    //Lo passo al login
    this.authSrv.login(loginData)
    .subscribe(res =>
    {
      console.log(this.formLogin)
      this.router.navigate(['/login'])
    })
  }

}
