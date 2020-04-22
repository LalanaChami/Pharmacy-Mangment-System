import { SupplierInteractionService } from './../../../a-suppliers-window/supplier-interaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Supplier } from '../../supplier.model';

@Component({
  selector: 'app-supplier-inventory-items',
  templateUrl: './supplier-inventory-items.component.html',
  styleUrls: ['./supplier-inventory-items.component.css']
})
export class SupplierInventoryItemsComponent implements OnInit,OnDestroy {

  suppliers: Supplier[] = [];
  isLoading= false;
  private supplierSubs: Subscription;

  constructor(private supplierInteractionService: SupplierInteractionService){}

  ngOnInit() {
    this.isLoading = true;
    this.supplierInteractionService.getSupplier();
    this.supplierSubs = this.supplierInteractionService.getSupplierUpdateListener()
      .subscribe((posts: Supplier[]) => {
        this.isLoading = false;
        this.suppliers = posts;
      });

  }

  onDelete(supplierId: string) {
    this.supplierInteractionService.deleteSupplier(supplierId);
  }

  ngOnDestroy() {
    this.supplierSubs.unsubscribe();
  }

}
