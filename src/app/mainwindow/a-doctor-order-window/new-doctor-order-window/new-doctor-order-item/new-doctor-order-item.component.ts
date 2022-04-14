import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { DoctorOrderServices } from './../../../a-inventory-window/a-shopping-cart-window/DoctorOrderServices.service';
import { Component, OnInit } from '@angular/core';
import { EmailInteractionService } from '../email-Interaction.service';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-new-doctor-order-item',
  templateUrl: './new-doctor-order-item.component.html',
  styleUrls: ['./new-doctor-order-item.component.css']
})
export class NewDoctorOrderItemComponent implements OnInit {



  // docOrders: any[] = [];
  isLoading= false;

  // docOrderSubs: Subscription;



  constructor(private doctorOrderService: DoctorOrderServices, private emailInteractionService: EmailInteractionService , private sankBar : MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.doctorOrderService.getDocOrders();
    this.isLoading = false;
    // this.docOrderSubs = this.doctorderService.getDocOrdersUpdateListener()
    //   .subscribe((posts) => {
    //     this.isLoading = false;
    //     this.docOrders = posts;
    //   });
  }

  onOrderVerify(id:string){
    this.isLoading = true;
    this.doctorOrderService.createVerifiedDoctorOrder(id);
    this.isLoading = false;


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

    // this.emailInteractionService.sendEmail(environment.backendBaseUrl + "/api/doctorOrder/sendmail", user).subscribe(
    //   data => {
    //     let res:any = data;
    //     console.log(
    //       `👏 ${user.name} an email has been successfully sent and the message id is ${res.messageId}`
    //     );
    //   },
    //   err => {
    //     console.log(err);

    //   }
    // );


    // this.doctorderService.deleteItem(id);

    // this.sankBar.open("Verification Email Sent!!", 'Close');
  }

  }


