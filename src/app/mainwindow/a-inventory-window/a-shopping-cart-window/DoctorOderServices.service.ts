import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DoctorOderServices{
  constructor(private http: HttpClient, private router: Router){
  }

  createDoctorUser(doctorName: string , doctorContact: string , doctorId: string ,doctorEmail: string ,drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ,totalAmount: number,pickupDate: string){
    const DoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorId:doctorId ,
                            doctorEmail:doctorEmail ,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post("http://localhost:3000/api/doctorOder",DoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }

}
