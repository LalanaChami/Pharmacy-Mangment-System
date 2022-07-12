import { MatSnackBar } from '@angular/material';
import { DoctorOrderServices } from './../../../../a-inventory-window/a-shopping-cart-window/DoctorOrderServices.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-etasu-popup',
  templateUrl: './etasu-popup.component.html',
  styleUrls: ['./etasu-popup.component.css']
})
export class EtasuPopupComponent implements OnInit {


  isLoading = false;
  doctorOrder: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data : {order: any}, private doctorOrderService: DoctorOrderServices, 
    private snackBar : MatSnackBar, public dialogRef : MatDialogRef<EtasuPopupComponent>) { 
    
    this.doctorOrder = data.order;
    
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.doctorOrderService.getDocOrders();
    this.isLoading = false;
  }

  onOrderVerify(id: string){
    this.isLoading = true;
    this.doctorOrderService.createVerifiedDoctorOrder(id)
    .subscribe(response =>{
      this.doctorOrderService.getDocOrders();
      this.doctorOrder = response.doctorOrder;
      if (response.doctorOrder.dispenseStatus === "Approved") {
        this.snackBar.open("Order has been verified by REMS Administrator", 'Close');
      } else {
        this.snackBar.open("Order has not yet been verified by REMS Administrator", 'Close');
      }
      this.isLoading = false;

    });;
  }

  async onPickup(id:string){
    this.doctorOrderService.createPickedUpDoctorOrder(id)
    .subscribe(response =>{
      this.doctorOrder = response.doctorOrder;
      this.doctorOrderService.getDocOrders();
      this.snackBar.open("Order has been marked as picked up", 'Close');
    });;

  }

}
