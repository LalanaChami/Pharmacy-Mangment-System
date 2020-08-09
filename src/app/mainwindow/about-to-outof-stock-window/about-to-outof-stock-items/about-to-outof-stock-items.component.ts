import { InventoryInteractionService } from './../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../a-inventory-window/inventory.model';

@Component({
  selector: 'app-about-to-outof-stock-items',
  templateUrl: './about-to-outof-stock-items.component.html',
  styleUrls: ['./about-to-outof-stock-items.component.css']
})
export class AboutToOutofStockItemsComponent implements OnInit {

  searchTerm : string;
  inventorys : Inventory[] = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getAboutToOutofStockInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryAOutUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });
  }

}
