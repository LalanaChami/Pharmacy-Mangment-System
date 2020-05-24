import { NgForm } from '@angular/forms';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Inventory } from './../../../a-inventory-window/inventory.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent implements OnInit {

  items: Array<any> =[];
  arr: Array<any> =[];
  arr1: Array<any> =[];
  itemArray: Array<any> =[];
  searchTerm: string;
  inventorys: Inventory[] = [];
  inven: Inventory[] = [];
  newArray: Array<any> =[];
  num: string;
  total :number;

  isLoading= false;
  private inventorySubs: Subscription;


  constructor(private inventoryInteractionService: InventoryInteractionService) {
    this.items =[
      {name: 'https://i.ibb.co/L9X6wKM/pharmacare-logo-hori-tagline-2.png'},
    ]
   }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory(null,null);
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });
  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }

  onAddToBill(itemId:string, name:string , expireDate:string , price:string, form:NgForm ){

  this.itemArray.push([itemId,name,expireDate,price,form.value.quantityNumber]);

   console.log(this.itemArray);

  }

  onAddToCheckout(checkoutArray: Array<any> =[], form: NgForm){


    console.log(checkoutArray);
    let length = checkoutArray.length;
    let x ;
    let z ;
    let sum;
    this.total = 0;

    for (let count = 0 ; count < length; count++) {
       x = checkoutArray[count][3];

       z = checkoutArray[count][4];
       sum = +x * +z ;

       this.total = this.total + sum;

    }

    console.log(this.total);
    return this.total;

  }



}
