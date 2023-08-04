//Interfaccia per effettuare la registrazione
export interface IRegister
{
  nome:string;
  cognome:string;
  email:string;
  password:string;
}

//Interfaccia per effettuare il login
export interface ILogin
{
  email:string;
  password:string;
}

//Interfaccia rappresentante lo user su json-server
export interface IUser
{
  id:number;
  nome:string;
  cognome:string;
  email:string;
}

//Interfaccia rappresentante le informazioni dello user (token + IUser qui di sopra)
export interface IAccessData
{
  accessToken: string;
  user:IUser;
}
