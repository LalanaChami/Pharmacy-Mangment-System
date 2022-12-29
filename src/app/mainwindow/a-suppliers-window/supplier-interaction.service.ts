import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Supplier} from './supplier.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SupplierInteractionService {
  private supplier: Supplier[] = [];
  private supplierUpdated = new Subject<Supplier[]>();

  constructor(private http: HttpClient, private router : Router){}

  getSupplier() {
    this.http.get<{message: string, suppliers: any}>('http://localhost:3000/api/supplier')
    .pipe(map(supplierData => {
     return supplierData.suppliers.map(supplier=>{
       return{

        supplierID: supplier.supplierID,
        name: supplier.name,
        email: supplier.email,
        contact: supplier.contact,
        drugsAvailable: supplier.drugsAvailable,
        id: supplier._id
       }
     })
    }))
    .subscribe((transformedSuppliers)=>{
      this.supplier = transformedSuppliers;
      this.supplierUpdated.next([...this.supplier])
    });

  }

  getSupplierUpdateListener() {
    return this.supplierUpdated.asObservable();
  }

  getSuppiers(id: string){
    return this.http.get<{_id: string , supplierID: string , name: string, email: string, contact: string, drugsAvailable: string}>
    ('http://localhost:3000/api/supplier/' + id);
  }

  addSupplier( supplierID: string, name: string, email: string, contact: string, drugsAvailable: string) {
    const supplier: Supplier = {id: null,
                                supplierID: supplierID,
                                name: name,
                                email:email,
                                contact: contact,
                                drugsAvailable:drugsAvailable
                               };
    this.http.post<{message: string, supplierId: string}>('http://localhost:3000/api/supplier',supplier)
    .subscribe((responseData)=>{
      const id = responseData.supplierId;
      supplier.id =id;
      this.supplier.push(supplier);
      this.supplierUpdated.next([...this.supplier]);
      this.router.navigate(["/suppliers/create"]);
    });

  }

  updateSupplier(id: string , supplierID: string , name: string, email: string, contact: string, drugsAvailable: string){
    const supplier : Supplier ={id:id ,supplierID:supplierID , name:name , email:email , contact:contact , drugsAvailable:drugsAvailable};
    this.http
             .put('http://localhost:3000/api/supplier/' + id , supplier)
             .subscribe(response => {
               const updatedSuppliers = [...this.supplier];
               const oldSupplierIndex = updatedSuppliers.findIndex(s => s.id ===supplier.id);
               updatedSuppliers[oldSupplierIndex] = supplier;
               this.supplierUpdated.next([...this.supplier]);
               this.router.navigate(["/suppliers/create"]);
             });
  }

  deleteSupplier(supplierId: string) {
    this.http.delete('http://localhost:3000/api/supplier/' + supplierId)
      .subscribe(() => {
        const updatedSupplier = this.supplier.filter(supplier => supplier.id !== supplierId);
        this.supplier = updatedSupplier;
        this.supplierUpdated.next([...this.supplier])
      });
  }
}
