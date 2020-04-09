import { SupplierInteractionService } from './../../../a-suppliers-window/supplier-interaction.service';
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

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

 constructor(private supplierInteractionService: SupplierInteractionService){}

  // onAddSupplier(){
  //   const record ={supplierID: this.enteredSupplierID,
  //                 name: this.enteredName,
  //                 email: this.enteredEmail,
  //                 contact: this.enteredContact,
  //                 drugsAvailable: this.enteredDrugsAvailable,
  //                 number: this.enteredNumber
  //                 };
  //   this.supplierInteraction.sendMessage(record);

  // }

  onAddSupplier(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.supplierInteractionService.addSupplier(form.value.supplierID,
                                                form.value.name,
                                                form.value.email,
                                                form.value.contact,
                                                form.value.drugsAvailable ,
                                                );
    form.resetForm();
  }



  ngOnInit() {
  }

}
