import { EmailInteractionService } from './../../new-doctor-order-window/email-Interaction.service';
import { DoctorOderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-order-item',
  templateUrl: './pickup-order-item.component.html',
  styleUrls: ['./pickup-order-item.component.css']
})
export class PickupOrderItemComponent implements OnInit {

  docPickedUpOders: any[] = [];
  isLoading= false;

  docPickedUpOderSubs: Subscription;



  constructor(private doctoderService: DoctorOderServices, private emailInteractionService: EmailInteractionService){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getPickedUpDocOders();
    this.docPickedUpOderSubs = this.doctoderService.getPickedUpDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docPickedUpOders = posts;
      });
  }


}
