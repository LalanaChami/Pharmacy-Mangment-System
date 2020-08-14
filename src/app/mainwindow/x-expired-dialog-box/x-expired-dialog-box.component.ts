import { EmailInteractionService } from './../a-doctor-order-window/new-doctor-order-window/email-Interaction.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-x-expired-dialog-box',
  templateUrl: './x-expired-dialog-box.component.html',
  styleUrls: ['./x-expired-dialog-box.component.css']
})
export class XExpiredDialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any, public emailInteractionService: EmailInteractionService , private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSendEmail(name:string,price:string,email:string,quantity:string,form: NgForm){

    console.log(name,price,email,quantity,form.value.quantityNumber);


    let user={
      name : name,
      email : email,
      price : price,
      quantity : quantity,
      quantityNumber : form.value.quantityNumber,

    }
    console.log(user);

    this.emailInteractionService.sendEmail("http://localhost:3000/api/inventory/sendmail", user).subscribe(
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

    this.snackBar.open("Email Has been sent...", 'Close')
  }

}
