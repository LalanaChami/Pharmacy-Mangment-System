import { EmailInteractionService } from './../../new-doctor-order-window/email-Interaction.service';
import { DoctorOderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verified-doctor-order-item',
  templateUrl: './verified-doctor-order-item.component.html',
  styleUrls: ['./verified-doctor-order-item.component.css']
})
export class VerifiedDoctorOrderItemComponent implements OnInit {

  docOders: any[] = [];
  isLoading= false;

  docOderSubs: Subscription;



  constructor(private doctoderService: DoctorOderServices, private emailInteractionService: EmailInteractionService){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getVerifiedDocOders();
    this.docOderSubs = this.doctoderService.getVerifiedDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }

}
