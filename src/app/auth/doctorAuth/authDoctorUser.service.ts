import { Router } from '@angular/router';
import { Subject } from 'rxjs';
//import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDoctorData } from './doctorAuth-model';

@Injectable({providedIn: 'root'})
export class AuthDoctorUserService {

  constructor(private http: HttpClient, private router: Router ){}

  createDoctorUser(name: string , contact: string , docId: string ,email: string ,password: string ){
    const authDoctorData :AuthDoctorData = {name:name , contact:contact , docId:docId , email:email , password:password};
    this.http.post("http://localhost:3000/api/doctorUser/doctorSignup",authDoctorData)
      .subscribe(response =>{
        console.log(response);
      });

  }

};
