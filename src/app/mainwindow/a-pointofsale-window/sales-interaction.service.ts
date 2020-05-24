import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Sales} from './sales.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SalesInteractionService {

  private sales: Sales[] = [];
  private salesUpdated = new Subject<Sales[]>();

  constructor(private http: HttpClient, private router : Router){}

  addSales( drugName: Array<any> =[], totalPrice: number, tax: number, paidAmount: number, balance: number) {
    const sales: Sales = {id: null,
                                drugName: drugName,
                                totalPrice: totalPrice,
                                tax:tax,
                                paidAmount: paidAmount,
                                balance:balance
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

}
