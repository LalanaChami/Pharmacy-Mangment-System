import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { DoctorOderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { Component, OnInit } from '@angular/core';
import { EmailInteractionService } from '../email-Interaction.service';

@Component({
  selector: 'app-new-doctor-order-item',
  templateUrl: './new-doctor-order-item.component.html',
  styleUrls: ['./new-doctor-order-item.component.css']
})
export class NewDoctorOrderItemComponent implements OnInit {



  docOders: any[] = [];
  isLoading= false;

  docOderSubs: Subscription;



  constructor(private doctoderService: DoctorOderServices, private emailInteractionService: EmailInteractionService , private sankBar : MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.doctoderService.getDocOders();
    this.docOderSubs = this.doctoderService.getDocOdersUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.docOders = posts;
      });
  }

  onOderVerify(name:string,email:string,total:number,pickupDate:string,drugId:any[] = [],drugName:any[] = [],drugPrice:any[] = [],drugQuantity:any[] = [],realQuantity:any[] = [],doctorId:string,doctorContact:string,id:string){

    this.doctoderService.createVerifiedDoctorOder(name,email,doctorId,total,pickupDate,drugId,drugName,drugPrice,drugQuantity,realQuantity,doctorContact);


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

    this.emailInteractionService.sendEmail("http://localhost:3000/api/doctorOder/sendmail", user).subscribe(
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


    this.doctoderService.deleteItem(id);

    this.sankBar.open("Verification Email Sent!!", 'Close');
  }

  }


