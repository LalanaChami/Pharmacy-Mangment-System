
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DoctorOderServices{
  private docOders:any[] = [];
  private docOdersUpdated = new Subject<any[]>();

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


  createVerifiedDoctorOder(doctorName: string,doctorEmail: string,doctorId: string ,totalAmount: number,pickupDate: string, drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ,doctorContact: string){
    const VerifiedDoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorId:doctorId ,
                            doctorEmail:doctorEmail ,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post("http://localhost:3000/api/verifiedDoctorOder",VerifiedDoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }

  getDocOders() {
    this.http.get<{message: string, doctorOders: any}>("http://localhost:3000/api/doctorOder")
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorId : doctorOder.doctorID,
        doctorEmail : doctorOder.doctorEmail ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate
       }
     })
    }))
    .subscribe((transformedDocOders)=>{
      this.docOders = transformedDocOders;
      this.docOdersUpdated.next([...this.docOders])
    });

  }

  getDocOdersUpdateListener() {
    return this.docOdersUpdated.asObservable();
  }

}
