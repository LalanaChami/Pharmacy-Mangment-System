import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {Sales} from './sales.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SalesInformationArray } from './salesInformationArray.model';

@Injectable({
  providedIn: 'root'
})
export class SalesInteractionService {

  private sales = [];
  private salesUpdated = new Subject<Sales[]>();

  private salesChart = [];
  private salesChartUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router : Router){}

  addSales( drugName: Array<any> =[], totalPrice: number, tax: number, paidAmount: number, balance: number) {
    const sales = {id: null,
                                drugName: drugName,
                                totalPrice: totalPrice,
                                tax:tax,
                                paidAmount: paidAmount,
                                balance:balance,
                                dateTime:null
                               };
    this.http.post<{message: string, salesId: string}>('http://localhost:3000/api/sales',sales)
    .subscribe((responseData)=>{
      const id = responseData.salesId;
      sales.id =id;
      this.sales.push(sales);
      this.salesUpdated.next([...this.sales]);
      //this.router.navigate(["/suppliers/create"]);
    });

  }

  getSales() {
    this.http.get<{message: string, sales: any}>('http://localhost:3000/api/sales')
    .pipe(map(salesData => {
     return salesData.sales.map(sales=>{
       return{
        drugName: sales.drugName,
        dateTime: sales.dateTime,
        totalPrice: sales.totalPrice,
        tax: sales.tax,
        paidAmount: sales.paidAmount,
        balance: sales.balance,
        id:sales._id,


       }
     })
    }))
    .subscribe((transformedSales)=>{
      this.sales = transformedSales;
      this.salesUpdated.next([...this.sales])
    });

  }

  getSalesChartInfo2():Observable<any>{

    return this.http.get<{ message: string,sales:any}>('http://localhost:3000/api/sales/getSalesChartInfo');

  }


   getSalesChartInfo(){
    console.log("service")
    this.http.get<{message: string, sales: any}>('http://localhost:3000/api/sales/getSalesChartInfo')
    .pipe(map(salesData => {
     return salesData.sales.map(sales=>{
       return{
        // drugName: sales.drugName,
        totalPrice: sales.total,
        dateTime: sales._id,
        drugName: "null",
        tax: "null",
        paidAmount: "null",
        balance: "null",
        id:"null",
       }
     })
    }))
    .subscribe((transformedSales)=>{

      this.salesChart = transformedSales;
      this.salesChartUpdated.next([...this.salesChart])
    });
  }

  getSalesChartUpdateListener() {
    return this.salesChartUpdated.asObservable();
    // console.log(this.salesChart);
  }

  getSalesUpdateListener() {
    return this.salesUpdated.asObservable();
    // console.log(this.salesChart);
  }

  // updateSupplier(id: string , supplierID: string , name: string, email: string, contact: string, drugsAvailable: string){
  //   const supplier : Supplier ={id:id ,supplierID:supplierID , name:name , email:email , contact:contact , drugsAvailable:drugsAvailable};
  //   this.http
  //            .put('http://localhost:3000/api/supplier/' + id , supplier)
  //            .subscribe(response => {
  //              const updatedSuppliers = [...this.supplier];
  //              const oldSupplierIndex = updatedSuppliers.findIndex(s => s.id ===supplier.id);
  //              updatedSuppliers[oldSupplierIndex] = supplier;
  //              this.supplierUpdated.next([...this.supplier]);
  //              this.router.navigate(["/suppliers/create"]);
  //            });
  // }

}
