import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthDoctorUserService } from '../authDoctorUser.service';
@Component({
  templateUrl: './doctorSignup.component.html',
  styleUrls: ['./doctorSignup.component.css']
})
export class DoctorSignupComponent{

  constructor(public authDoctorUserService : AuthDoctorUserService){}

  onDoctorSignup(form:NgForm){

    if(form.invalid){
      return;
    }
    this.authDoctorUserService.createDoctorUser(form.value.name, form.value.contact, form.value.nic, form.value.email, form.value.password);

  }

  onImagePicked(){

  }

}
