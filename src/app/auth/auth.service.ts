import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService{

  constructor(private http: HttpClient){}

  createUser(name: string , contact: string , nic: string ,email: string ,password: string ){
    const authData :AuthData = {name:name , contact:contact , nic:nic , email:email , password:password};
    this.http.post("http://localhost:3000/api/user/signup",authData)
      .subscribe(response =>{
        console.log(response);
      });

  }

  login(email: string, password){
    const authData :AuthData = {name: null , contact: null , nic: null , email: email , password: password};
    this.http.post("http://localhost:3000/api/user/login",authData)
      .subscribe(response =>{
        console.log(response);
      });
  }

}
