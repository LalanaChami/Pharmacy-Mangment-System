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

  inventorys: Inventory[] = [];
  isLoading= false;
  currentPage= 1;
  totalItems= 10;
  itemsPerPage = 8;
  pageSizeOptions =[8,12,16,20,24];
  private inventorySubs: Subscription;

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

}
