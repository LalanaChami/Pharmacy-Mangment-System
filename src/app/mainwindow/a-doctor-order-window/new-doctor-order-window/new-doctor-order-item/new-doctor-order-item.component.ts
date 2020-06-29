import { Subscription } from 'rxjs';
import { DoctorOderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-doctor-order-item',
  templateUrl: './new-doctor-order-item.component.html',
  styleUrls: ['./new-doctor-order-item.component.css']
})
export class NewDoctorOrderItemComponent implements OnInit {



  docOders: any[] = [];
  isLoading= false;

  docOderSubs: Subscription;



  constructor(private doctoderService: DoctorOderServices){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getDocOders();
    this.docOderSubs = this.doctoderService.getDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }

}
