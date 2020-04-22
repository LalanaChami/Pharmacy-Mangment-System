import { NgForm } from '@angular/forms';
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
  private mode = "create";
  private inventoryId : string;


  constructor(private inventoryInteractionService: InventoryInteractionService, public route: ActivatedRoute){}

  ngOnInit() {
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
        });
      }else{
        this.mode = "create";
        this.inventoryId = null;
      }
    })
  }


  onAddInventory(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if(this.mode === "create"){
      this.inventoryInteractionService.addInventory(form.value.name,
        form.value.quantity,
        form.value.batchId,
        form.value.expireDate
        );
    }else{
      this.inventoryInteractionService.updateInventory(this.inventoryId,form.value.name,
        form.value.quantity,
        form.value.batchId,
        form.value.expireDate);
    }

    form.resetForm();
  }

}
