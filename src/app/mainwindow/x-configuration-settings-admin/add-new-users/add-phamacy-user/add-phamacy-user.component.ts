import { ParamMap, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthDoctorUserService } from './../../../../auth/doctorAuth/authDoctorUser.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-phamacy-user',
  templateUrl: './add-phamacy-user.component.html',
  styleUrls: ['./add-phamacy-user.component.css']
})
export class AddPhamacyUserComponent implements OnInit {
  enteredSupplierID = "";
  enteredName = "";
  enteredEmail = "";
  enteredContact = "";
  enteredDrugsAvailable = "";
  enteredNumber = "";


  doc ;
  isLoading = false;

  form: FormGroup;
  private mode = "create";
  private docId : string;

  constructor(public authService : AuthService,public authDoctorUserService : AuthDoctorUserService, public route: ActivatedRoute){}


  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'email': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'nic': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'contact': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'password': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]})

    });

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('docId')){
        this.mode = "edit";
        this.docId = paramMap.get('docId');
        this.isLoading = true;
        this.authDoctorUserService.getDoctorDatas(this.docId).subscribe(docData =>{
        this.isLoading = false;
        this.doc = {id:docData._id,
                           name: docData.name,
                           email : docData.email,
                           docId : docData.docId,
                           contact: docData.contact,
                           password: docData.password
                          };
                          console.log(this.doc);
                          console.log(this.docId);
        this.form.setValue({
                          'name':this.doc.name ,
                          'contact':this.doc.contact,
                          'nic' : this.doc.docId,
                          'email':this.doc.email ,
                          'password':this.doc.password});

        });
      }else{
        this.mode = "create";
        this.docId = null;
      }
    })
  }

  get registerFormControl() {
    return this.form.controls;
  }



  onDoctorSignup(){

    if(this.form.invalid){
      return;
    }

    if(this.mode === "create"){
    this.authDoctorUserService.createDoctorUser(this.form.value.name,
      this.form.value.contact,
      this.form.value.nic,
      this.form.value.email,
      this.form.value.password);

    }else{
      this.authDoctorUserService.updateDoctor(this.docId,this.form.value.name,
        this.form.value.contact,
        this.form.value.nic,
        this.form.value.email,
        this.form.value.password);

    }

    this.form.reset();
  }

  onImagePicked(){

  }



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
