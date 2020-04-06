import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Supplier} from './supplier.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierInteractionService {
  private supplier: Supplier[] = [];
  private supplierUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient){}

  getSupplier() {
    this.http.get<{message: string, suppliers: Supplier[]}>('http://localhost:3000/api/supplier')
    .subscribe((supplierData)=>{
      this.supplier= supplierData.suppliers;
      this.supplierUpdated.next([...this.supplier])
    });

  }

  getSupplierUpdateListener() {
    return this.supplierUpdated.asObservable();
  }

  addSupplier(supplierID: string, name: string, email: string, contact: string, drugsAvailable: string, number: string) {
    const supplier: Supplier = {supplierID: supplierID,
                                name: name,
                                email:email,
                                contact: contact,
                                drugsAvailable:drugsAvailable ,
                               };
    this.http.post<{message: string}>('http://localhost:3000/api/supplier',supplier)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.supplier.push(supplier);
      this.supplierUpdated.next([...this.supplier]);
    });

  }
}
