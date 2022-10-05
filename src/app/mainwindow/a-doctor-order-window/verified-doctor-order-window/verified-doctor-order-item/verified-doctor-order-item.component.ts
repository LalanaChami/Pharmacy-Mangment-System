import { MatSnackBar } from '@angular/material';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
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



  constructor( private inventoryInteractionService: InventoryInteractionService,
               private doctoderService: DoctorOderServices,
               private emailInteractionService: EmailInteractionService,
               private sankBar: MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getVerifiedDocOders();
    this.docOderSubs = this.doctoderService.getVerifiedDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }


  async onPickup(name:string,email:string,total:number,pickupDate:string,drugId:any[] = [],drugName:any[] = [],drugPrice:any[] = [],drugQuantity:any[] = [],realQuantity:any[] = [],doctorId:string,doctorContact:string,id:string){

    let length = drugName.length;
    let quantity= 0;
    console.log(length, realQuantity);


    for (let count = 0 ; count < length; count++) {

      quantity= +realQuantity[count] - +drugQuantity[count];
      await this.inventoryInteractionService.updateQuantity(drugId[count],quantity);

    console.log(drugId[count],drugQuantity[count],realQuantity[count],quantity);

   }

    this.doctoderService.createPickedUpDoctorOder(name,email,doctorId,total,pickupDate,drugId,drugName,drugPrice,drugQuantity,doctorContact);



    let user={
      name : name,
      email : email,
      total : total,
      pickupDate : pickupDate,
      drugName : drugName,
      drugPrice : drugPrice,
      drugQuantity : drugQuantity
    }
    console.log(user);

    this.emailInteractionService.sendEmail("http://localhost:3000/api/verifiedDoctorOder/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 ${user.name} an email has been successfully and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);

      }
    );



    this.sankBar.open("Pickedup Email Sent!!", 'Close');
    this.doctoderService.deleteVerifiedItem(id);
  }

}
