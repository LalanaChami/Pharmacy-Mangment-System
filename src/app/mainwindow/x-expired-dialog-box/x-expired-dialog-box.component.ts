import { NgForm } from '@angular/forms';
import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-x-expired-dialog-box',
  templateUrl: './x-expired-dialog-box.component.html',
  styleUrls: ['./x-expired-dialog-box.component.css']
})
export class XExpiredDialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit() {
  }

  onSendEmail(name:string,price:string,email:string,quantity:string,form: NgForm){
    console.log(name,price,email,quantity,form.value.quantityNumber)
  }

}
