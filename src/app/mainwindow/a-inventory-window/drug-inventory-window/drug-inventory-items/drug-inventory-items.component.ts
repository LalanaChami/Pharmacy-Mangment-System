import { InventoryInteractionService } from './../../inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../inventory.model';

@Component({
  selector: 'app-drug-inventory-items',
  templateUrl: './drug-inventory-items.component.html',
  styleUrls: ['./drug-inventory-items.component.css']
})
export class DrugInventoryItemsComponent implements OnInit {
  searchTerm : string;
  inventorys : Inventory[] = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory(null,null);
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });

  }


  onDelete(supplierId: string) {
    this.inventoryInteractionService.deleteInventory(supplierId);
  }

  ngOnDestroy() {
    this.inventorySubs.unsubscribe();
  }

}
