
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class DoctorOderServices{
  private docOders:any[] = [];
  private docOdersUpdated = new Subject<any[]>();
  private VerifiedDocOders:any[] = [];
  private VerifiedDocOdersUpdated = new Subject<any[]>();
  private PickedUpDocOders:any[] = [];
  private PickedUpDocOdersUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router){
  }

  createDoctorUser(doctorName: string , doctorContact: string , doctorId: string ,doctorEmail: string ,drugId: Array<any> = [] ,drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ,realQuantity: Array<any> = [] ,totalAmount: number,pickupDate: string){
    const DoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorId:doctorId ,
                            doctorEmail:doctorEmail ,
                            drugId:drugId,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            realQuantity:realQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post(environment.backendBaseUrl + "/api/doctorOder",DoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }




  createVerifiedDoctorOder(doctorName: string,doctorEmail: string,doctorId: string ,totalAmount: number,pickupDate: string,drugId: Array<any> = [] ,drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [],realQuantity: Array<any> = [] ,doctorContact: string){
    const VerifiedDoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorId:doctorId ,
                            doctorEmail:doctorEmail ,
                            drugId:drugId,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            realQuantity:realQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post(environment.backendBaseUrl + "/api/verifiedDoctorOder",VerifiedDoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }



  createPickedUpDoctorOder(doctorName: string,doctorEmail: string,doctorId: string ,totalAmount: number,pickupDate: string, drugId: Array<any> = [], drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ,doctorContact: string){
    const PickedUpDoctorOderData  = {doctorName:doctorName ,
                            doctorContact:doctorContact ,
                            doctorId:doctorId ,
                            doctorEmail:doctorEmail ,
                            drugId:drugId ,
                            drugName:drugName ,
                            drugPrice:drugPrice,
                            drugQuantity:drugQuantity,
                            totalAmount:totalAmount,
                            pickupDate:pickupDate};
    this.http.post(environment.backendBaseUrl + "/api/pickedUpOders",PickedUpDoctorOderData)
      .subscribe(response =>{
        console.log(response);
      });

  }



  getDocOders() {
    this.http.get<{message: string, doctorOders: any}>(environment.backendBaseUrl + "/api/doctorOder")
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(doctorOder => {
       return{
        patientName : doctorOder.patientName,
        patientDOB : doctorOder.patientDOB,
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorId : doctorOder.doctorID,
        doctorEmail : doctorOder.doctorEmail ,
        drugId : doctorOder.drugId ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        realQuantity : doctorOder.realQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        id: doctorOder._id
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




  getVerifiedDocOders() {
    this.http.get<{message: string, doctorOders: any}>(environment.backendBaseUrl + "/api/verifiedDoctorOder")
    .pipe(map(docOderData => {
     return docOderData.doctorOders.map(doctorOder => {
       return{
        doctorName : doctorOder.doctorName ,
        doctorContact : doctorOder.doctorContact ,
        doctorId : doctorOder.doctorID,
        doctorEmail : doctorOder.doctorEmail ,
        drugId : doctorOder.drugId ,
        drugName : doctorOder.drugNames ,
        drugPrice : doctorOder.drugPrice,
        drugQuantity : doctorOder.drugQuantity,
        realQuantity : doctorOder.realQuantity,
        totalAmount : doctorOder.totalAmount,
        pickupDate : doctorOder.pickupDate,
        id: doctorOder._id
       }
     })
    }))
    .subscribe((transformedDocOders)=>{
      this.VerifiedDocOders = transformedDocOders;
      this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders])
    });
  }

  getVerifiedDocOdersUpdateListener() {
    return this.VerifiedDocOdersUpdated.asObservable();
  }


  getPickedUpDocOders() {
    this.http.get<{message: string, doctorOders: any}>(environment.backendBaseUrl + "/api/pickedUpOders")
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
        pickupDate : doctorOder.pickupDate,
        acctualDate : doctorOder.dateTime,
        id: doctorOder._id
       }
     })
    }))
    .subscribe((transformedPickedUpDocOders)=>{
      this.PickedUpDocOders = transformedPickedUpDocOders;
      this.PickedUpDocOdersUpdated.next([...this.PickedUpDocOders])
    });
  }

  getPickedUpDocOdersUpdateListener() {
    return this.PickedUpDocOdersUpdated.asObservable();
  }

  deleteItem(oderId: string) {
    this.http.delete(environment.backendBaseUrl + '/api/doctorOder/' + oderId)
      .subscribe(() =>{
        const inventoryUpdated = this.docOders.filter(order => order.id !== oderId);
        this.docOders = inventoryUpdated;
        this.docOdersUpdated.next([...this.docOders])
      });
  }

  deleteVerifiedItem(oderId: string) {
    this.http.delete(environment.backendBaseUrl + '/api/verifiedDoctorOder/' + oderId)
      .subscribe(() =>{
        const inventoryUpdated = this.docOders.filter(order => order.id !== oderId);
        this.docOders = inventoryUpdated;
        this.docOdersUpdated.next([...this.docOders])
      });
  }

}
