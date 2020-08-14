import { XOutofstockDialogBoxComponent } from './../../../xoutofstock-dialog-box/xoutofstock-dialog-box.component';
import { MatDialog } from '@angular/material';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';

@Component({
  selector: 'app-outofstock-items',
  templateUrl: './outofstock-items.component.html',
  styleUrls: ['./outofstock-items.component.css']
})
export class OutofstockItemsComponent implements OnInit {

  searchTerm : string;
  inventorys : Inventory[] = [];
  isLoading= false;
  private inventorySubs: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService, public dialog :MatDialog) { }
  displayConfirmBox = false;
  displayMain = true;

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getOutofStockInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryOutUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });
  }

  OpenMessageBox(email:string,name:string,quantity:string,batchId:string,expireDate:string,price:string){
    let dialogRef = this.dialog.open(XOutofstockDialogBoxComponent, {data: {email,name,quantity,batchId,expireDate,price}});

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
