import { MatSnackBar } from '@angular/material';
import { SupplierInteractionService } from './../../../a-suppliers-window/supplier-interaction.service';
import { Component, OnInit} from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Supplier } from '../../supplier.model';


@Component({
  selector: 'app-add-supplier-elements',
  templateUrl: './add-supplier-elements.component.html',
  styleUrls: ['./add-supplier-elements.component.css']
})
export class AddSupplierElementsComponent implements OnInit {

  enteredSupplierID = "";
  enteredName = "";
  enteredEmail = "";
  enteredContact = "";
  enteredDrugsAvailable = "";
  enteredNumber = "";
  supplier : Supplier;
  isLoading = false;

  form: FormGroup;
  private mode = "create";
  private supplierId : string;


 constructor(private supplierInteractionService: SupplierInteractionService, public route: ActivatedRoute, private snackBar : MatSnackBar){}


  ngOnInit() {
    this.form = new FormGroup({
      'supplierID': new FormControl(null,{validators: [Validators.required, Validators.minLength(1),Validators.pattern('[0-9]+[Vv]')]}),
      'name': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'email': new FormControl(null,{validators: [Validators.required,Validators.email, Validators.minLength(1),
        Validators.pattern("[^ @]*@[^ @]*"),emailDomainValidator]}),
      'contact': new FormControl(null,{validators: [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9]{10,12}$")]}),
      'drugsAvailable': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('supplierId')){
        this.mode = "edit";
        this.supplierId = paramMap.get('supplierId');
        this.isLoading = true;
        this.supplierInteractionService.getSuppiers(this.supplierId).subscribe(supplierData =>{
        this.isLoading = false;
        this.supplier = {id:supplierData._id,
                           supplierID: supplierData.supplierID,
                           name: supplierData.name,
                           email : supplierData.email,
                           contact: supplierData.contact,
                           drugsAvailable: supplierData.drugsAvailable
                          };
        this.form.setValue({'supplierID':this.supplier.supplierID ,
                          'name':this.supplier.name ,
                          'email':this.supplier.email ,
                          'contact':this.supplier.contact,
                          'drugsAvailable':this.supplier.drugsAvailable});

        });
      }else{
        this.mode = "create";
        this.supplierId = null;
      }
    })
  }
  get registerFormControl() {
    return this.form.controls;
  }

  onAddSupplier() {
    if (this.form.invalid) {
      return;
    }

    if(this.mode === "create"){
      this.supplierInteractionService.addSupplier(this.form.value.supplierID,
        this.form.value.name,
        this.form.value.email,
        this.form.value.contact,
        this.form.value.drugsAvailable
        );
        this.snackBar.open("Supplier Added Successfully", "Close");
    }else{
      this.supplierInteractionService.updateSupplier(this.supplierId,this.form.value.supplierID,
        this.form.value.name,
        this.form.value.email,
        this.form.value.contact,
        this.form.value.drugsAvailable );
        this.snackBar.open("Supplier Edited!! ", "Close");
    }

    this.form.reset();
  }





}

//supplier email validation
function emailDomainValidator(control: FormControl) { (1)
  let email = control.value; (2)
  if (email && email.indexOf("@") != -1) { (3)
    let [_, domain] = email.split("@"); (4)
    if (domain !== "gmail.com") { (5)
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null; (6)
}
