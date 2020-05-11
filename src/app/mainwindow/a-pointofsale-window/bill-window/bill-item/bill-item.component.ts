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
  searchTerm: string;
  inventorys: Inventory[] = [];
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

}
