import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { Inventory } from './../../inventory.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-inventory-elements',
  templateUrl: './add-inventory-elements.component.html',
  styleUrls: ['./add-inventory-elements.component.css']
})
export class AddInventoryElementsComponent implements OnInit {
  enteredName = "";
  enteredQuantity = "";
  enteredBatchId = "";
  enteredExpireDate = "";

  inventory : Inventory ;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private inventoryId : string;


  constructor(private inventoryInteractionService: InventoryInteractionService, public route: ActivatedRoute){}

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'quantity': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'batchId': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]}),
      'expireDate': new FormControl(null,{validators: [Validators.required, Validators.minLength(1)]})

    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('inventoryId')){
        this.mode = "edit";
        this.inventoryId = paramMap.get('inventoryId');
        this.isLoading = true;
        this.inventoryInteractionService.getInventorys(this.inventoryId).subscribe(inventoryData =>{
        this.isLoading = false;
        this.inventory = {id:inventoryData._id,
                           name: inventoryData.name,
                           quantity : inventoryData.quantity,
                           batchId: inventoryData.batchId,
                           expireDate: inventoryData.expireDate
                          };
        this.form.setValue({'name':this.inventory.name ,
                            'quantity':this.inventory.quantity ,
                            'batchId':this.inventory.batchId ,
                            'expireDate':this.inventory.expireDate});
        });
      }else{
        this.mode = "create";
        this.inventoryId = null;
      }
    })
  }


  onAddInventory() {
    if (this.form.invalid) {
      return;
    }

    if(this.mode === "create"){
      this.inventoryInteractionService.addInventory(this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate
        );
    }else{
      this.inventoryInteractionService.updateInventory(this.inventoryId,this.form.value.name,
        this.form.value.quantity,
        this.form.value.batchId,
        this.form.value.expireDate);
    }

    this.form.reset();
  }

}
