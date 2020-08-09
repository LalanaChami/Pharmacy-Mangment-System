import { InventoryInteractionService } from './../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../a-inventory-window/inventory.model';

@Component({
  selector: 'app-salesdetails-items',
  templateUrl: './salesdetails-items.component.html',
  styleUrls: ['./salesdetails-items.component.css']
})
export class SalesdetailsItemsComponent implements OnInit {

  searchTerm : string;
  inventoryis  = [];
  isLoading= false;
  private inventorySubs: Subscription;
  displayConfirmBox = false;
  displayMain = true;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getAboutToExpireInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryAExUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventoryis = posts;
      });
  }

}
