import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthDoctorUserService } from './../../../../auth/doctorAuth/authDoctorUser.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-doctor-user',
  templateUrl: './add-doctor-user.component.html',
  styleUrls: ['./add-doctor-user.component.css']
})
export class AddDoctorUserComponent implements OnInit {
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

  ngOnInit(){
    this.form = new FormGroup({
      'name': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'email': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'nic': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'contact': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'password': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'role': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]})

    });

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('userId')){
        this.mode = "edit";
        this.docId = paramMap.get('userId');
        this.isLoading = true;
        this.authService.getUserDatas(this.docId).subscribe(docData =>{
        this.isLoading = false;
        this.doc = {id:docData._id,
                           name: docData.name,
                           email : docData.email,
                           nic : docData.nic,
                           contact: docData.contact,
                           password: docData.password,
                           role : docData.role
                          };
                          console.log(this.doc);
                          console.log(this.docId);
        this.form.setValue({
                          'name':this.doc.name ,
                          'contact':this.doc.contact,
                          'nic' : this.doc.nic,
                          'email':this.doc.email ,
                          'password':this.doc.password,
                          'role':this.doc.role});

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



  onSignup(){

    if(this.form.invalid){
      return;
    }


    if(this.mode === "create"){
    this.authService.createUser(this.form.value.name,
                                this.form.value.contact,
                                this.form.value.nic,
                                this.form.value.email,
                                this.form.value.password,
                                this.form.value.role);
    }else{
      this.authService.updateUser(this.docId,this.form.value.name,
                                              this.form.value.contact,
                                              this.form.value.nic,
                                              this.form.value.email,
                                              this.form.value.password,
                                              this.form.value.role);
    }
    this.form.reset();
  };

}


// name : req.body.name,
//         contact : req.body.contact,
//         nic : req.body.nic,
//         email : req.body.email,
//         password : hash,
//         role: req.body.role
