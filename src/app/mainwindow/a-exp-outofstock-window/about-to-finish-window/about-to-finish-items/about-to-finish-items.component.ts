import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';

@Component({
  selector: 'app-about-to-finish-items',
  templateUrl: './about-to-finish-items.component.html',
  styleUrls: ['./about-to-finish-items.component.css']
})
export class AboutToFinishItemsComponent implements OnInit {

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
