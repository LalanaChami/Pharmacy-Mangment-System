import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Supplier} from './supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierInteractionService {
  private supplier: Supplier[] = [];
  private supplierUpdated = new Subject<Supplier[]>();

  getSupplier() {
    return [...this.supplier];
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
                                number:number};
    this.supplier.push(supplier);
    this.supplierUpdated.next([...this.supplier]);
  }
}
