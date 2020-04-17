import { SupplierInteractionService } from './../../../a-suppliers-window/supplier-interaction.service';
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
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
  private mode = "create";
  private supplierId : string;


 constructor(private supplierInteractionService: SupplierInteractionService, public route: ActivatedRoute){}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('supplierId')){
        this.mode = "edit";
        this.supplierId = paramMap.get('supplierId');
        this.supplierInteractionService.getSuppiers(this.supplierId).subscribe(supplierData =>{
          this.supplier = {id:supplierData._id,
                           supplierID: supplierData.supplierID,
                           name: supplierData.name,
                           email : supplierData.email,
                           contact: supplierData.contact,
                           drugsAvailable: supplierData.drugsAvailable
                          };
        });
      }else{
        this.mode = "create";
        this.supplierId = null;
      }
    })
  }

  onAddSupplier(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode === "create"){
      this.supplierInteractionService.addSupplier(form.value.supplierID,
        form.value.name,
        form.value.email,
        form.value.contact,
        form.value.drugsAvailable
        );
    }else{
      this.supplierInteractionService.updateSupplier(this.supplierId,form.value.supplierID,
        form.value.name,
        form.value.email,
        form.value.contact,
        form.value.drugsAvailable );
    }

    form.resetForm();
  }





}
