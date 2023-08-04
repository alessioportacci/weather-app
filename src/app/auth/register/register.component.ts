import { IRegister } from './../auth-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit
{
  formRegister!: FormGroup;

  constructor
  (
    private authSrv: AuthServiceService,
    private router:Router
  )
  {}

  ngOnInit(): void
  {
    this.formRegister = new FormGroup
    ({
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      cognome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }

  onSubmit()
  {
    //Mi creo l'oggetto da passare al register
    const registerData:IRegister =
    {
      nome: this.formRegister.get('nome')?.value,
      cognome: this.formRegister.get('cognome')?.value,
      email: this.formRegister.get('email')?.value,
      password: this.formRegister.get('password')?.value
    }

    console.log(registerData)

    //Lo passo al register
    this.authSrv.signUp(registerData)
    .subscribe(res =>
    {
      console.log(this.formRegister)
      this.router.navigate(['/register'])
    })
  }
}


