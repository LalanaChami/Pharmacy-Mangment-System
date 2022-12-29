import { Injectable } from '@angular/core';
import { Inventory } from './inventory.model';


import { Subject } from 'rxjs';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const InventorySchema = '../../../../backend/models/inventory.js';

@Injectable({
  providedIn: 'root'
})

export class InventoryInteractionService {

  private inventory: Inventory[] = [];
  private inventoryUpdated = new Subject<Inventory[]>();

  private inventoryi: Inventory[] = [];
  private inventoryUpdatedi = new Subject<Inventory[]>();

  private inventor = [];
  private inventoryUpdate = new Subject<any[]>();

  private inventorex = [];
  private inventoryUpdateex = new Subject<any[]>();

  private inventorot = [];
  private inventoryUpdateot = new Subject<any[]>();

  private inventoraex = [];
  private inventoryUpdateaex = new Subject<any[]>();

  private inventoraot = [];
  private inventoryUpdateaot = new Subject<any[]>();



  constructor(private http: HttpClient, private router : Router){}

  getInventory(itemsPerPage: number , currentPage:number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, inventorys: any}>('http://localhost:3000/api/inventory' + queryParams)
    .pipe(map(inventoryData => {
     return inventoryData.inventorys.map(inventory=>{
       return{
        email: inventory.email,
        name: inventory.name,
        quantity:inventory.quantity,
        batchId:inventory.batchId,
        expireDate: inventory.expireDate,
        price: inventory.price,
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


  getOutofStockInventory() {

    this.http.get<{message: string, inventorys: any}>('http://localhost:3000/api/inventory/outofstock' )
    .pipe(map(inventoryData => {
     return inventoryData.inventorys.map(inventory=>{
       return{
        email: inventory.email,
        name: inventory.name,
        quantity:inventory.quantity,
        batchId:inventory.batchId,
        expireDate: new Date(inventory.expireDate),
        price: inventory.price,
        id: inventory._id,
        imagePath:  inventory.imagePath
       }
     })
    }))
    .subscribe((transformedInventory)=>{
      this.inventorot = transformedInventory;
      this.inventoryUpdateot.next([...this.inventorot])
    });
  }


  getAboutToOutofStockInventory() {

    this.http.get<{message: string, inventorys: any}>('http://localhost:3000/api/inventory/abouttooutofstock' )
    .pipe(map(inventoryData => {
     return inventoryData.inventorys.map(inventory=>{
       return{
        email: inventory.email,
        name: inventory.name,
        quantity:inventory.quantity,
        batchId:inventory.batchId,
        expireDate: new Date(inventory.expireDate),
        price: inventory.price,
        id: inventory._id,
        imagePath:  inventory.imagePath
       }
     })
    }))
    .subscribe((transformedInventory)=>{
      this.inventoraot = transformedInventory;
      this.inventoryUpdateaot.next([...this.inventoraot])
    });
  }


  getExpiredInventory(){
    this.http.get<{message: string, inventorys: any}>('http://localhost:3000/api/inventory/getExpired')
    .pipe(map(inventoryData => {
     return inventoryData.inventorys.map(inventory=>{
       return{
        email: inventory.email,
        name: inventory.name,
        quantity:inventory.quantity,
        batchId:inventory.batchId,
        expireDate:new Date(inventory.expireDate),
        price: inventory.price,
        id: inventory._id,
        imagePath:  inventory.imagePath
       }
     })
    }))
    .subscribe((transformedInventory)=>{
      this.inventorex = transformedInventory;
      this.inventoryUpdateex.next([...this.inventorex])
    });
  }

  getAboutToExpireInventory(){
    let currentDate = new Date();

    this.http.get<{message: string, inventorys: any}>('http://localhost:3000/api/inventory/getAboutToExpire')
    .pipe(map(inventoryData => {
     return inventoryData.inventorys.map(inventory=>{
       return{
        email: inventory.email,
        name: inventory.name,
        quantity:inventory.quantity,
        batchId:inventory.batchId,
        expireDate:new Date(inventory.expireDate),
        price: inventory.price,
        id: inventory._id,
        imagePath:  inventory.imagePath

       }
     })
    }))
    .subscribe((transformedInventory)=>{
      this.inventoraex = transformedInventory;
      this.inventoryUpdateaex.next([...this.inventoraex])
    });
  }



  // getItemsOfId(id: string){
  //   this.http.get<{message: string, inventorys: any}>('http://localhost:3000/api/inventory/' + id)
  //   .pipe(map(inventoryData => {
  //     return inventoryData.inventorys.map(inventory=>{
  //       return{
  //        name: inventory.name,
  //        quantity:inventory.quantity,
  //        batchId:inventory.batchId,
  //        expireDate: inventory.expireDate,
  //        id: inventory._id,
  //        imagePath:  inventory.imagePath
  //       }
  //     })
  //    }))
  //     .subscribe(() =>{
  //       const inventoryUpdated = this.inventory.filter(inventory => inventory.id !== id);
  //       this.inventory = inventoryUpdated;
  //       this.inventoryUpdated.next([...this.inventory])
  //     });
  //   }

  getInventoryExUpdateListener() {
    return this.inventoryUpdateex.asObservable();
  }

  getInventoryOutUpdateListener() {
    return this.inventoryUpdateot.asObservable();
  }

  getInventoryAExUpdateListener() {
    return this.inventoryUpdateaex.asObservable();
  }

  getInventoryAOutUpdateListener() {
    return this.inventoryUpdateaot.asObservable();
  }


  getInventoryUpdateListener() {
    return this.inventoryUpdated.asObservable();
  }

  getInventorys(id: string){
    return this.http.get<{_id: string, email: string  , name: string, quantity: string, batchId: string, expireDate: string, price:string ,imagePath:string}>
    ('http://localhost:3000/api/inventory/' + id);
  }

  addInventory( email: string, name: string, quantity: string, batchId: string, expireDate: string, price: string , image: File) {
    const inventoryData = new FormData();
    inventoryData.append("email", email);
    inventoryData.append("name", name);
    inventoryData.append("quantity", quantity);
    inventoryData.append("batchId", batchId);
    inventoryData.append("expireDate", expireDate);
    inventoryData.append("price", price);
    inventoryData.append("image", image, name);

    this.http.post<{message: string, inventory: Inventory}>('http://localhost:3000/api/inventory',inventoryData)
    .subscribe((responseData)=>{
      const inventory: Inventory ={id: responseData.inventory.id,
                                   email:email ,
                                   name:name ,
                                   quantity: quantity,
                                   batchId: batchId ,
                                   expireDate: expireDate ,
                                   price: price,
                                   imagePath : responseData.inventory.imagePath};

      this.inventory.push(inventory);
      this.inventoryUpdated.next([...this.inventory]);
      this.router.navigate(["/inventory/create"]);
    });

  }

  updateInventory(id: string , email: string ,name: string, quantity: string, batchId: string, expireDate: string, price: string ,image: File | string){

    let inventoryData: Inventory | FormData;

    if (typeof(image)==='object'){
      inventoryData = new FormData();
      inventoryData.append("id", id);
      inventoryData.append("email",email);
      inventoryData.append("name",name);
      inventoryData.append("quantity",quantity);
      inventoryData.append("batchId",batchId);
      inventoryData.append("expireDate",expireDate);
      inventoryData.append("price",price);
      inventoryData.append("image", image, name);

    } else{
       inventoryData  ={id : id ,
                        email : email ,
                        name : name ,
                        quantity : quantity ,
                        batchId : batchId ,
                        expireDate : expireDate ,
                        price: price,
                        imagePath: image};
    }
    this.http
             .put('http://localhost:3000/api/inventory/' + id , inventoryData)
             .subscribe(response => {
               const updatedInventorys = [...this.inventory];
               const oldInventoryIndex = updatedInventorys.findIndex(i => i.id === id);

               const inventory : Inventory ={id : id ,
                                             email : email ,
                                             name : name ,
                                             quantity : quantity ,
                                             batchId : batchId ,
                                             expireDate : expireDate ,
                                             price: price,
                                             imagePath: " "};
               updatedInventorys[oldInventoryIndex] = inventory;
               this.inventoryUpdated.next([...this.inventory]);
               this.router.navigate(["/inventory/create"]);
             });
  }


  updateQuantity(id: string ,quantity: number){
    const inventory   ={id:id ,quantity:quantity };
    this.http
             .put('http://localhost:3000/api/inventory/updateQuantity/' + id , inventory)
             .subscribe(response => {
               const updatedInventory = [...this.inventor];
               const oldInventoryIndex = updatedInventory.findIndex(s => s.id ===inventory.id);
               updatedInventory[oldInventoryIndex] = inventory;
               this.inventoryUpdate.next([...this.inventor]);
               //this.router.navigate(["/suppliers/create"]);
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
