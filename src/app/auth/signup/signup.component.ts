import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public authService : AuthService){}

  onSignup(form:  NgForm){

    if(form.invalid){
      return;
    }
    console.log(form.value.role)
    this.authService.createUser(form.value.name,form.value.contact,form.value.nic,form.value.email,form.value.password,form.value.role);
  };

};
