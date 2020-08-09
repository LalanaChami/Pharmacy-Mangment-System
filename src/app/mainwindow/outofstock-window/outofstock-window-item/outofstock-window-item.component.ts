import { InventoryInteractionService } from './../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../a-inventory-window/inventory.model';

@Component({
  selector: 'app-outofstock-window-item',
  templateUrl: './outofstock-window-item.component.html',
  styleUrls: ['./outofstock-window-item.component.css']
})
export class OutofstockWindowItemComponent implements OnInit {

  searchTerm : string;
  inventorys : Inventory[] = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getOutofStockInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryOutUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });
  }

}
