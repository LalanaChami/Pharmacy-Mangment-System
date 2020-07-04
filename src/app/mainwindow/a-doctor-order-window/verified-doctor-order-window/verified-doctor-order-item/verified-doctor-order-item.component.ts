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


  onPickup(name:string,email:string,total:number,pickupDate:string,drugName:any[] = [],drugPrice:any[] = [],drugQuantity:any[] = [],doctorId:string,doctorContact:string,id:string){

    this.doctoderService.createPickedUpDoctorOder(name,email,doctorId,total,pickupDate,drugName,drugPrice,drugQuantity,doctorContact);


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

    //this.doctoderService.deleteItem(id);
  }

}
