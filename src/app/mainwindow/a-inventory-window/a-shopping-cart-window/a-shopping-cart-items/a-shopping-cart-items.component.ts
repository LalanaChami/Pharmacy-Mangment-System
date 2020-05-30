import { NgForm } from '@angular/forms';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../inventory.model';


@Component({
  selector: 'app-a-shopping-cart-items',
  templateUrl: './a-shopping-cart-items.component.html',
  styleUrls: ['./a-shopping-cart-items.component.css']
})
export class AShoppingCartItemsComponent implements OnInit {
  searchTerm: string;
  inventorys: Inventory[] = [];
  itemArray: Array<any> =[];
  isLoading= false;
  currentPage= 1;
  totalItems= 10;
  itemsPerPage = 8;
  pageSizeOptions =[8,12,16,20,24];
  private inventorySubs: Subscription;
  itemNumber: number;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory(this.itemsPerPage,this.currentPage);
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage= pageData.pageIndex + 1;
    this.itemsPerPage=  pageData.pageSize;
    this.inventoryInteractionService.getInventory(this.itemsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }

  onAddToCart(itemId:string, name:string , expireDate:string , price:string, form:NgForm ){
    this.itemArray.push([itemId,name,expireDate,price,form.value.quantityNumber]);

    console.log(this.itemArray);
    this.itemNumber = this.itemArray.length;
  }

}
