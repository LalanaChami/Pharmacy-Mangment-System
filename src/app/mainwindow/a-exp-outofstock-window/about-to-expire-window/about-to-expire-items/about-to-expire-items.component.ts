import { EmailInteractionService } from './../../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';
import { MatDialog, MatDialogModule } from '@angular/material'
import { XExpiredDialogBoxComponent } from 'src/app/mainwindow/x-expired-dialog-box/x-expired-dialog-box.component';

@Component({
  selector: 'app-about-to-expire-items',
  templateUrl: './about-to-expire-items.component.html',
  styleUrls: ['./about-to-expire-items.component.css']
})
export class AboutToExpireItemsComponent implements OnInit {

  searchTerm : string;
  inventoryis  = [];
  isLoading= false;
  private inventorySubs: Subscription;
  displayConfirmBox = false;
  displayMain = true;

  constructor(private inventoryInteractionService: InventoryInteractionService,
              public dialog :MatDialog,
              private emailInteractionService : EmailInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getAboutToExpireInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryAExUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventoryis = posts;
      });
  }

  calcRemainingDays(expireDate){
    let expDate = new Date(expireDate);
    let currentDate = new Date();
    let days = Math.abs(Math.floor((currentDate.getTime() - expDate.getTime()) / 1000 / 60 / 60 / 24));
    return days;
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
