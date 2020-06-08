import { map } from 'rxjs/operators';
import { AShoppingCartItemsComponent } from './../../mainwindow/a-inventory-window/a-shopping-cart-window/a-shopping-cart-items/a-shopping-cart-items.component';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
//import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDoctorData } from './doctorAuth-model';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({providedIn: 'root'})
export class AuthDoctorUserService {

  isAuthenticated = false;
  private token : string;
  private tokenTimer : any;
  private authStatusListener  = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private aShoppingCartItemsComponent:AShoppingCartItemsComponent){}

  createDoctorUser(name: string , contact: string , docId: string ,email: string ,password: string ){
    const authDoctorData :AuthDoctorData = {name:name , contact:contact , docId:docId , email:email , password:password};
    this.http.post("http://localhost:3000/api/doctorUser/doctorSignup",authDoctorData)
      .subscribe(response =>{
        console.log(response);
      });

  }


  login(email: string, password){
    const authDoctorData :AuthDoctorData = {name: name , contact: null , docId: null , email: email , password: password};
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/doctorUser/doctorLogin",authDoctorData)
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
          console.log(expirationDate,email);
          this.saveAuthData(token, expirationDate );
          this.aShoppingCartItemsComponent.onViewUserEmail(email);
          this.router.navigate(['/shoppingcart']);

        }
      });
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


  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/doctorLogin']);

  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
  }

  getDoctors(email: string){

    return this.http.get<{name: string , contact: string , docId: string, email: string}>
    ('http://localhost:3000/api/shoppingcart/');

  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
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


  /////////////////////////////////////////////////////////////

  // interface TokenResponse {
  //   token: string;
  // }

  // export interface TokenPayload {
  //   email: string;
  //   password: string;
  //   name?: string;
  // }

  // private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: Token): Observable<any> {
  //   let base;

  //   if (method === 'post') {
  //     base = this.http.post(`/api/${type}`, user);
  //   } else {
  //     base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  //   }

  //   const request = base.pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );

  //   return request;
  // }

  // public profile(): Observable<any> {
  //   return this.request('get', 'profile');
  // }



};
