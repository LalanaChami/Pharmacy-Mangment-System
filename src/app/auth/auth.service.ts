import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService{

  isAuthenticated = false;
  private token : string;
  private tokenTimer : any;
  private authStatusListener  = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(name: string , contact: string , nic: string ,email: string ,password: string ){
    const authData :AuthData = {name:name , contact:contact , nic:nic , email:email , password:password};
    this.http.post("http://localhost:3000/api/user/signup",authData)
      .subscribe(response =>{
        console.log(response);
      });

  }

  login(email: string, password){
    const authData :AuthData = {name: null , contact: null , nic: null , email: email , password: password};
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login",authData)
      .subscribe(response =>{
        const token= response.token;
        this.token=token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate );

          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation,expiresIn)
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn /1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);

  }

  private setAuthTimer(duration : number){
    console.log("setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
  }


  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate : new Date(expirationDate)
    }
  }



}
