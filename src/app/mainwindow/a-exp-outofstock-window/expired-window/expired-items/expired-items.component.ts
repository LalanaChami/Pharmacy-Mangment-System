import { Subscription } from 'rxjs';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';

@Component({
  selector: 'app-expired-items',
  templateUrl: './expired-items.component.html',
  styleUrls: ['./expired-items.component.css']
})
export class ExpiredItemsComponent implements OnInit {
  searchTerm : string;
  inventorys : Inventory[] = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getExpiredInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });
  }

}
