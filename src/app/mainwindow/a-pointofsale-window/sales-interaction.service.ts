import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  getSalesUpdateListener() {
    return this.salesUpdated.asObservable();
  }

}
