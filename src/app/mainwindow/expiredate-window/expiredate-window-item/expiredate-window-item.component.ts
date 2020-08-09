import { EmailInteractionService } from './../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service';
import { InventoryInteractionService } from './../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../a-inventory-window/inventory.model';

@Component({
  selector: 'app-expiredate-window-item',
  templateUrl: './expiredate-window-item.component.html',
  styleUrls: ['./expiredate-window-item.component.css']
})
export class ExpiredateWindowItemComponent implements OnInit {

  searchTerm : string;
  inventorys : Inventory[] = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService,  private emailInteractionService : EmailInteractionService) { }
  displayConfirmBox = false;
  displayMain = true;

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getExpiredInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryExUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });
  }

}
