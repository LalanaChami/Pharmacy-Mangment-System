import { EmailInteractionService } from './../../new-doctor-order-window/email-Interaction.service';
import { DoctorOrderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOrderServices.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { EtasuPopupComponent } from './../../new-doctor-order-window/new-doctor-order-item/etasu-popup/etasu-popup.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pickup-order-item',
  templateUrl: './pickup-order-item.component.html',
  styleUrls: ['./pickup-order-item.component.css']
})
export class PickupOrderItemComponent implements OnInit {

  // docPickedUpOrders: any[] = [];
  isLoading= false;

  // docPickedUpOrderSubs: Subscription;



  constructor(public doctorOrderService: DoctorOrderServices, private emailInteractionService: EmailInteractionService, private dialog : MatDialog){}

  ngOnInit() {
    this.isLoading = true;
    this.doctorOrderService.getDocOrders();
    this.isLoading = false;
    // this.docPickedUpOrderSubs = this.doctorderService.getPickedUpDocOrdersUpdateListener()
    //   .subscribe((posts) => {
    //     this.isLoading = false;
    //     this.docPickedUpOrders = posts;
      // });
  }

  onViewOrder(order:any) {

    this.dialog.open(EtasuPopupComponent, {
      maxWidth: '500px',
      data: {order : order}
    });

  }


}
