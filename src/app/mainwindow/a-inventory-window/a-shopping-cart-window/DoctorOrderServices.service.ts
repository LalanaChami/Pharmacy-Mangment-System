
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class DoctorOrderServices{
  private docOrders:any[] = [];
  private docOrdersUpdated = new Subject<any[]>();
  private VerifiedDocOrders:any[] = [];
  private VerifiedDocOrdersUpdated = new Subject<any[]>();
  private PickedUpDocOrders:any[] = [];
  private PickedUpDocOrdersUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router){
  }

  createDoctorUser(doctorName: string , doctorContact: string , doctorId: string ,doctorEmail: string ,drugId: Array<any> = [] ,drugName: Array<any> = [],drugPrice: Array<any> = [] ,drugQuantity: Array<any> = [] ,realQuantity: Array<any> = [] ,totalAmount: number,pickupDate: string){
    const DoctorOrderData  = {doctorName:doctorName ,
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
    this.http.post(environment.backendBaseUrl + "/api/doctorOrder",DoctorOrderData)
      .subscribe(response =>{
        console.log(response);
      });

  }




  createVerifiedDoctorOrder(id: string){
    this.http.patch(environment.backendBaseUrl + "/api/doctorOrder/fhir/rems/" + id, {})
      .subscribe(response =>{
        console.log(response);
      });

  }



  createPickedUpDoctorOrder(id: string){
    this.http.patch(environment.backendBaseUrl + "/api/doctorOrder/fhir/rems/pickedUp/" + id, {})
      .subscribe(response =>{
        console.log(response);
      });

  }



  getDocOrders() {
    const orders = [];
    const verifiedOrders = [];
    const pickedUpOrders = [];

    this.http.get<{message: string, doctorOrders: any}>(environment.backendBaseUrl + "/api/doctorOrder")
    .pipe(map(docOrderData => {
      docOrderData.doctorOrders.forEach(doctorOrder => {

       const transformedOrder = {
        patientName : doctorOrder.patientName,
        patientDOB : doctorOrder.patientDOB,
        doctorName : doctorOrder.doctorName ,
        doctorContact : doctorOrder.doctorContact ,
        doctorId : doctorOrder.doctorID,
        doctorEmail : doctorOrder.doctorEmail ,
        drugId : doctorOrder.drugId ,
        drugName : doctorOrder.drugNames ,
        drugPrice : doctorOrder.drugPrice,
        drugQuantity : doctorOrder.drugQuantity,
        realQuantity : doctorOrder.realQuantity,
        totalAmount : doctorOrder.totalAmount,
        pickupDate : doctorOrder.pickupDate,
        actualDate: doctorOrder.actualDate,
        dispenseStatus: doctorOrder.dispenseStatus,
        caseNumber: doctorOrder.caseNumber,
        id: doctorOrder._id
       }

       if (transformedOrder.dispenseStatus === "Approved") {
          verifiedOrders.push(transformedOrder);
       } else if (transformedOrder.dispenseStatus === "Picked Up") {
         pickedUpOrders.push(transformedOrder);
       } else {
         orders.push(transformedOrder);
       }
     });

     return {
       orders,
       pickedUpOrders,
       verifiedOrders
     }
    }))
    .subscribe((transformedDocOrders)=>{
      this.docOrders = transformedDocOrders.orders;
      this.VerifiedDocOrders = transformedDocOrders.verifiedOrders;
      this.PickedUpDocOrders = transformedDocOrders.pickedUpOrders;

      this.docOrdersUpdated.next([...this.docOrders]);
      this.VerifiedDocOrdersUpdated.next([...this.VerifiedDocOrders]);
      this.PickedUpDocOrdersUpdated.next([...this.PickedUpDocOrders]);
    });

    return {
      orders,
      pickedUpOrders,
      verifiedOrders
    }
  }

  getDocOrdersUpdateListener() {
    return this.docOrdersUpdated.asObservable();
  }




  // getVerifiedDocOrders() {
  //   this.http.get<{message: string, doctorOrders: any}>(environment.backendBaseUrl + "/api/verifiedDoctorOrder")
  //   .pipe(map(docOrderData => {
  //    return docOrderData.doctorOrders.map(doctorOrder => {
  //      return{
  //       doctorName : doctorOrder.doctorName ,
  //       doctorContact : doctorOrder.doctorContact ,
  //       doctorId : doctorOrder.doctorID,
  //       doctorEmail : doctorOrder.doctorEmail ,
  //       drugId : doctorOrder.drugId ,
  //       drugName : doctorOrder.drugNames ,
  //       drugPrice : doctorOrder.drugPrice,
  //       drugQuantity : doctorOrder.drugQuantity,
  //       realQuantity : doctorOrder.realQuantity,
  //       totalAmount : doctorOrder.totalAmount,
  //       pickupDate : doctorOrder.pickupDate,
  //       id: doctorOrder._id
  //      }
  //    })
  //   }))
  //   .subscribe((transformedDocOrders)=>{
  //     this.VerifiedDocOrders = transformedDocOrders;
  //     this.VerifiedDocOrdersUpdated.next([...this.VerifiedDocOrders])
  //   });
  // }

  getVerifiedDocOrdersUpdateListener() {
    return this.VerifiedDocOrdersUpdated.asObservable();
  }


  // getPickedUpDocOrders() {
  //   this.http.get<{message: string, doctorOrders: any}>(environment.backendBaseUrl + "/api/pickedUpOrders")
  //   .pipe(map(docOrderData => {
  //    return docOrderData.doctorOrders.map(doctorOrder => {
  //      return{
  //       doctorName : doctorOrder.doctorName ,
  //       doctorContact : doctorOrder.doctorContact ,
  //       doctorId : doctorOrder.doctorID,
  //       doctorEmail : doctorOrder.doctorEmail ,
  //       drugName : doctorOrder.drugNames ,
  //       drugPrice : doctorOrder.drugPrice,
  //       drugQuantity : doctorOrder.drugQuantity,
  //       totalAmount : doctorOrder.totalAmount,
  //       pickupDate : doctorOrder.pickupDate,
  //       acctualDate : doctorOrder.dateTime,
  //       id: doctorOrder._id
  //      }
  //    })
  //   }))
  //   .subscribe((transformedPickedUpDocOrders)=>{
  //     this.PickedUpDocOrders = transformedPickedUpDocOrders;
  //     this.PickedUpDocOrdersUpdated.next([...this.PickedUpDocOrders])
  //   });
  // }

  getPickedUpDocOrdersUpdateListener() {
    return this.PickedUpDocOrdersUpdated.asObservable();
  }

  deleteItem(orderId: string) {
    this.http.delete(environment.backendBaseUrl + '/api/doctorOrder/' + orderId)
      .subscribe(() =>{
        const inventoryUpdated = this.docOrders.filter(order => order.id !== orderId);
        this.docOrders = inventoryUpdated;
        this.docOrdersUpdated.next([...this.docOrders])
      });
  }

  // deleteVerifiedItem(orderId: string) {
  //   this.http.delete(environment.backendBaseUrl + '/api/verifiedDoctorOrder/' + orderId)
  //     .subscribe(() =>{
  //       const inventoryUpdated = this.docOrders.filter(order => order.id !== orderId);
  //       this.docOrders = inventoryUpdated;
  //       this.docOrdersUpdated.next([...this.docOrders])
  //     });
  // }

}
