import { MatSnackBar } from '@angular/material';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { EmailInteractionService } from './../../new-doctor-order-window/email-Interaction.service';
import { DoctorOrderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOrderServices.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { EtasuPopupComponent } from './../../new-doctor-order-window/new-doctor-order-item/etasu-popup/etasu-popup.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verified-doctor-order-item',
  templateUrl: './verified-doctor-order-item.component.html',
  styleUrls: ['./verified-doctor-order-item.component.css']
})
export class VerifiedDoctorOrderItemComponent implements OnInit {

  // docOrders: any[] = [];
  isLoading= false;

  // docOrderSubs: Subscription;



  constructor( private inventoryInteractionService: InventoryInteractionService,
               private doctorOrderService: DoctorOrderServices,
               private emailInteractionService: EmailInteractionService,
               private snackBar: MatSnackBar,
               private dialog : MatDialog){}

  ngOnInit() {
    this.isLoading = true;
    this.doctorOrderService.getDocOrders();
    this.isLoading = false;
    // this.docOrderSubs = this.doctorderService.getVerifiedDocOrdersUpdateListener()
    //   .subscribe((posts) => {
    //     this.isLoading = false;
    //     this.docOrders = posts;
    //   });
  }


  async onPickup(id:string){

  //   let length = drugName.length;
  //   let quantity= 0;
  //   console.log(length, realQuantity);


  //   for (let count = 0 ; count < length; count++) {

  //     quantity= +realQuantity[count] - +drugQuantity[count];
  //     await this.inventoryInteractionService.updateQuantity(drugId[count],quantity);

  //   console.log(drugId[count],drugQuantity[count],realQuantity[count],quantity);

  //  }

    this.doctorOrderService.createPickedUpDoctorOrder(id)
    .subscribe(response =>{
      this.doctorOrderService.getDocOrders();
      this.snackBar.open("Order has been marked as picked up", 'Close');
    });;

    // let user={
    //   name : name,
    //   email : email,
    //   total : total,
    //   pickupDate : pickupDate,
    //   drugName : drugName,
    //   drugPrice : drugPrice,
    //   drugQuantity : drugQuantity
    // }
    // console.log(user);

    // this.emailInteractionService.sendEmail(environment.backendBaseUrl + "/api/verifiedDoctorOrder/sendmail", user).subscribe(
    //   data => {
    //     let res:any = data;
    //     console.log(
    //       `👏 ${user.name} an email has been successfully and the message id is ${res.messageId}`
    //     );
    //   },
    //   err => {
    //     console.log(err);

    //   }
    // );



    // this.doctorderService.deleteItem(id);
  }

  onViewOrder(order:any) {

    this.dialog.open(EtasuPopupComponent, {
      maxWidth: '500px',
      data: {order : order}
    });

  }

}
