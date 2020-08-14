import { MatSnackBar } from '@angular/material';
import { SupplierInteractionService } from './../../../a-suppliers-window/supplier-interaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Supplier } from '../../supplier.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-supplier-inventory-items',
  templateUrl: './supplier-inventory-items.component.html',
  styleUrls: ['./supplier-inventory-items.component.css']
})
export class SupplierInventoryItemsComponent implements OnInit,OnDestroy {
  searchTerm : string;
  suppliers: Supplier[] = [];
  isLoading= false;
  userIsAuthenticated = false;
  private supplierSubs: Subscription;
  private authStatusSub: Subscription;

  constructor(private supplierInteractionService: SupplierInteractionService, private authService: AuthService , private snackBar: MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.supplierInteractionService.getSupplier();
    this.supplierSubs = this.supplierInteractionService.getSupplierUpdateListener()
      .subscribe((posts: Supplier[]) => {
        this.isLoading = false;
        this.suppliers = posts;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onDelete(supplierId: string) {
    this.supplierInteractionService.deleteSupplier(supplierId);
    this.snackBar.open("Supplier Deleted Successfully", "Close");
  }

  ngOnDestroy() {
    this.supplierSubs.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
