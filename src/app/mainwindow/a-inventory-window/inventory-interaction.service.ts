import { Injectable } from '@angular/core';
import { Inventory } from './inventory.model';

import { Subject } from 'rxjs';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class InventoryInteractionService {

  private inventory: Inventory[] = [];
  private inventoryUpdated = new Subject<Inventory[]>();

  constructor(private http: HttpClient, private router : Router){}

  getInventory() {
    this.http.get<{message: string, inventorys: any}>('http://localhost:3000/api/inventory')
    .pipe(map(inventoryData => {
     return inventoryData.inventorys.map(inventory=>{
       return{
        name: inventory.name,
        quantity:inventory.quantity,
        batchId:inventory.batchId,
        expireDate: inventory.expireDate,
        id: inventory._id,
        imagePath:  inventory.imagePath
       }
     })
    }))
    .subscribe((transformedInventory)=>{
      this.inventory = transformedInventory;
      this.inventoryUpdated.next([...this.inventory])
    });

  }

  getInventoryUpdateListener() {
    return this.inventoryUpdated.asObservable();
  }

  getInventorys(id: string){
    return this.http.get<{_id: string  , name: string, quantity: string, batchId: string, expireDate: string}>
    ('http://localhost:3000/api/inventory/' + id);
  }

  addInventory( name: string, quantity: string, batchId: string, expireDate: string , image: File) {
    const inventoryData = new FormData();
    inventoryData.append("name", name);
    inventoryData.append("quantity", quantity);
    inventoryData.append("batchId", batchId);
    inventoryData.append("expireDate", expireDate);
    inventoryData.append("image", image, name);

    this.http.post<{message: string, inventory: Inventory}>('http://localhost:3000/api/inventory',inventoryData)
    .subscribe((responseData)=>{
      const inventory: Inventory ={id: responseData.inventory.id,
                                   name:name ,
                                   quantity: quantity,
                                   batchId: batchId ,
                                   expireDate: expireDate ,
                                   imagePath : responseData.inventory.imagePath};

      this.inventory.push(inventory);
      this.inventoryUpdated.next([...this.inventory]);
      this.router.navigate(["/inventory/create"]);
    });

  }

  updateInventory(id: string , name: string, quantity: string, batchId: string, expireDate: string){
    const inventory : Inventory ={id:id , name:name , quantity:quantity , batchId:batchId , expireDate:expireDate , imagePath:null};
    this.http
             .put('http://localhost:3000/api/inventory/' + id , inventory)
             .subscribe(response => {
               const updatedInventorys = [...this.inventory];
               const oldInventoryIndex = updatedInventorys.findIndex(i => i.id ===inventory.id);
               updatedInventorys[oldInventoryIndex] = inventory;
               this.inventoryUpdated.next([...this.inventory]);
               this.router.navigate(["/inventory/create"]);
             });
  }

  deleteInventory(inventoryId: string) {
    this.http.delete('http://localhost:3000/api/inventory/' + inventoryId)
      .subscribe(() =>{
        const inventoryUpdated = this.inventory.filter(inventory => inventory.id !== inventoryId);
        this.inventory = inventoryUpdated;
        this.inventoryUpdated.next([...this.inventory])
      });
  }
}
