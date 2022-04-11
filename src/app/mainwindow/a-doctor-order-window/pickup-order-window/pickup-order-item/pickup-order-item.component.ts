import { EmailInteractionService } from './../../new-doctor-order-window/email-Interaction.service';
import { DoctorOrderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOrderServices.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-order-item',
  templateUrl: './pickup-order-item.component.html',
  styleUrls: ['./pickup-order-item.component.css']
})
export class PickupOrderItemComponent implements OnInit {

  docPickedUpOrders: any[] = [];
  isLoading= false;

  docPickedUpOrderSubs: Subscription;



  constructor(private doctorderService: DoctorOrderServices, private emailInteractionService: EmailInteractionService){}

  ngOnInit() {
    this.isLoading = true;
    this.doctorderService.getDocOrders();
    this.docPickedUpOrderSubs = this.doctorderService.getPickedUpDocOrdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docPickedUpOrders = posts;
      });
  }


}
