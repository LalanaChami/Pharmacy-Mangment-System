import { MatSnackBar } from '@angular/material';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { Inventory } from './../../inventory.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator'

@Component({
  selector: 'app-add-inventory-elements',
  templateUrl: './add-inventory-elements.component.html',
  styleUrls: ['./add-inventory-elements.component.css']
})
export class AddInventoryElementsComponent implements OnInit {
  enteredEmail = "";
  enteredName = "";
  enteredQuantity = "";
  enteredBatchId = "";
  enteredExpireDate = "";
  enteredPrice = "";

  inventory : Inventory ;
  isLoading = false;
  form: FormGroup;
  imagePreview : string;
  private mode = "create";
  private inventoryId : string;


  constructor(private inventoryInteractionService: InventoryInteractionService, public route: ActivatedRoute , private snackBar: MatSnackBar){}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'name': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'quantity': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'batchId': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'expireDate': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'price': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'image': new FormControl(null,{validators: [Validators.required],asyncValidators:[mimeType]})

    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('inventoryId')){
        this.mode = "edit";
        this.inventoryId = paramMap.get('inventoryId');
        this.isLoading = true;
        this.inventoryInteractionService.getInventorys(this.inventoryId).subscribe(inventoryData =>{
        this.isLoading = false;
        this.inventory = {id:inventoryData._id,
                           email: inventoryData.email,
                           name: inventoryData.name,
                           quantity : inventoryData.quantity,
                           batchId: inventoryData.batchId,
                           expireDate: inventoryData.expireDate,
                           price: inventoryData.price,
                           imagePath: inventoryData.imagePath
                          };
        this.form.setValue({'email':this.inventory.email ,
                            'name':this.inventory.name ,
                            'quantity':this.inventory.quantity ,
                            'batchId':this.inventory.batchId ,
                            'expireDate':this.inventory.expireDate,
                            'price':this.inventory.price,
                             'image':this.inventory.imagePath});
        });
      }else{
        this.mode = "create";
        this.inventoryId = null;
      }
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddInventory() {
    if (this.form.invalid) {
      return;
    }

    if(this.mode === "create"){
      this.inventoryInteractionService.addInventory(this.form.value.email,this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate,
        this.form.value.price,
        this.form.value.image

        );

        this.snackBar.open("Drug Added Successfully", "Close");
    }else{
      this.inventoryInteractionService.updateInventory(this.inventoryId,this.form.value.email,this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate,
        this.form.value.price,
        this.form.value.image);

        this.snackBar.open("Drug Edited Successfully", "Close");
    }

    this.form.reset();
  }

}
