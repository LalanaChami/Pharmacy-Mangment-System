import { EmailInteractionService } from './../../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service';
import { XExpiredDialogBoxComponent } from './../../../x-expired-dialog-box/x-expired-dialog-box.component';
import { Subscription } from 'rxjs';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';
import { MatDialog, MatDialogModule } from '@angular/material'

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

  constructor(private inventoryInteractionService: InventoryInteractionService, public dialog :MatDialog, private emailInteractionService : EmailInteractionService) { }
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

  OpenMessageBox(email:string,name:string,quantity:string,batchId:string,expireDate:string,price:string){
    let dialogRef = this.dialog.open(XExpiredDialogBoxComponent, {data: {email,name,quantity,batchId,expireDate,price}});

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog results: ${result}`)
    })

  }
  ClickYes(){
    this.displayMain=false;
 }

 ClickNo(){
    this.displayConfirmBox = false;
 }

}
