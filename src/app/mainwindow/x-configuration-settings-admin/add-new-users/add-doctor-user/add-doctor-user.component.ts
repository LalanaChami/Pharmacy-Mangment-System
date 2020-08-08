import { NgForm } from '@angular/forms';
import { AuthDoctorUserService } from './../../../../auth/doctorAuth/authDoctorUser.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-doctor-user',
  templateUrl: './add-doctor-user.component.html',
  styleUrls: ['./add-doctor-user.component.css']
})
export class AddDoctorUserComponent  {

  constructor(public authService : AuthService,public authDoctorUserService : AuthDoctorUserService){}



  // onDoctorSignup(form1:NgForm){

  //   if(form1.invalid){
  //     return;
  //   }
  //   this.authDoctorUserService.createDoctorUser(form1.value.name, form1.value.contact, form1.value.nic, form1.value.email, form1.value.password);

  // }

  // onImagePicked(){

  // }

  onSignup(form:  NgForm){

    if(form.invalid){
      return;
    }
    console.log(form.value.role)
    this.authService.createUser(form.value.name,form.value.contact,form.value.nic,form.value.email,form.value.password,form.value.role);
  };

}


// onAddSupplier() {
//   if (this.form.invalid) {
//     return;
//   }

//   if(this.mode === "create"){
//     this.supplierInteractionService.addSupplier(this.form.value.supplierID,
//       this.form.value.name,
//       this.form.value.email,
//       this.form.value.contact,
//       this.form.value.drugsAvailable
//       );
//   }else{
//     this.supplierInteractionService.updateSupplier(this.supplierId,this.form.value.supplierID,
//       this.form.value.name,
//       this.form.value.email,
//       this.form.value.contact,
//       this.form.value.drugsAvailable );
//   }

//   this.form.reset();
// }
