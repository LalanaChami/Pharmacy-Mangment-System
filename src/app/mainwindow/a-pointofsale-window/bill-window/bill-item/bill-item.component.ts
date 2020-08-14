import { MatSnackBar } from '@angular/material';
import { SalesInformationArray } from './../../salesInformationArray.model';
import { NgForm } from '@angular/forms';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Inventory } from './../../../a-inventory-window/inventory.model';
import { Component, OnInit } from '@angular/core';
import { SalesInteractionService } from './../../sales-interaction.service';


@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent implements OnInit {
  array: Array<SalesInformationArray> =[];
  items: Array<any> =[];
  arr: Array<any> =[];
  arr1: Array<any> =[];
  itemArray: Array<any> =[];
  searchTerm: string;
  inventorys: Inventory[] = [];
  inven: Inventory[] = [];
  newArray: Array<any> = [];
  num: string;
  total: number;
  tax: number;
  paidAmount: number;
  balance: number;
  dataArray: Array<any> =[];

  isLoading= false;
  private inventorySubs: Subscription;


  constructor(private inventoryInteractionService: InventoryInteractionService, private salesInteractionService:SalesInteractionService , private snackbar : MatSnackBar ) {
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

  onAddToBill(itemId:string, name:string , expireDate:string , price:string, form:NgForm, realQuantity:string ){

  this.itemArray.push([itemId,name,expireDate,price,form.value.quantityNumber,realQuantity]);
  this.dataArray.push([name,form.value.quantityNumber]);

  //  console.log(this.itemArray);

  }

  onAddToCheckout(checkoutArray: Array<any> =[], form: NgForm){


    // console.log(checkoutArray);
    let length = checkoutArray.length;
    let x ;
    let z ;
    let sum;
    this.total = 0;

    for (let count = 0 ; count < length; count++) {
       x = checkoutArray[count][3];

       z = checkoutArray[count][4];
       sum = +x * +z ;

       this.total = this.total + sum;

       let quantity = +checkoutArray[count][5] - +checkoutArray[count][4];
       this.inventoryInteractionService.updateQuantity(
        checkoutArray[count][0],
        quantity
        );

    }

    console.log(this.total);





    return this.total;

  }

  onPrintBill(total: number,form: NgForm,checkoutArray: Array<any> =[]){
    //this.array = ['nnkn','kdjfh'];
    this.tax = form.value.tax;
    this.paidAmount = form.value.paidAmount;
    let reducingAmount = +this.tax + +this.paidAmount;
    this.balance = reducingAmount - total ;

    console.log(this.tax);
    console.log(this.paidAmount);
    console.log(reducingAmount);
    console.log(this.balance);
    console.log(this.dataArray);

    this.salesInteractionService.addSales(this.dataArray,
      this.total,
      this.tax,
      this.paidAmount,
      this.balance
      );

      this.snackbar.open("Transaction Added to Sales Report !!", 'Close');

  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
// const printContent = document.getElementById("print-section");
// const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
// WindowPrt.document.write(printContent.innerHTML);
// WindowPrt.document.close();
// WindowPrt.focus();
// WindowPrt.print();
// WindowPrt.close();
}

// onAddSupplier() {
//   if (this.form.invalid) {
//     return;
//   }


//     this.supplierInteractionService.updateSupplier(this.supplierId,this.form.value.supplierID,
//       this.form.value.name,
//       this.form.value.email,
//       this.form.value.contact,
//       this.form.value.drugsAvailable );


//   this.form.reset();
// }



}
