import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';

@Component({
  selector: 'app-about-to-expire-items',
  templateUrl: './about-to-expire-items.component.html',
  styleUrls: ['./about-to-expire-items.component.css']
})
export class AboutToExpireItemsComponent implements OnInit {

  searchTerm : string;
  inventoryis  = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getAboutToExpireInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventoryis = posts;
      });
  }

  calcRemainingDays(expireDate){
    let expDate = new Date(expireDate);
    let currentDate = new Date();
    let days = Math.abs(Math.floor((currentDate.getTime() - expDate.getTime()) / 1000 / 60 / 60 / 24));
    return days;
  }



}
