import { AuthGuard } from './auth/auth.guard';
import { DrugInventoryWindowComponent } from './mainwindow/a-inventory-window/drug-inventory-window/drug-inventory-window.component';
import { SupplierInventoryWindowComponent } from './mainwindow/a-suppliers-window/supplier-inventory-window/supplier-inventory-window.component';
import { SupplierInventoryItemsComponent } from './mainwindow/a-suppliers-window/supplier-inventory-window/supplier-inventory-items/supplier-inventory-items.component';
import { AddSupplierWindowComponent } from './mainwindow/a-suppliers-window/add-supplier-window/add-supplier-window.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInventoryWindowComponent } from './mainwindow/a-inventory-window/add-inventory-window/add-inventory-window.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  {path: 'suppliers', component: AddSupplierWindowComponent  },
  {path: 'suppliers/create', component: SupplierInventoryWindowComponent },
  {path: 'edit/:supplierId', component: AddSupplierWindowComponent ,canActivate:[AuthGuard]},

  {path: 'inventory', component: AddInventoryWindowComponent },
  {path: 'inventory/create', component: DrugInventoryWindowComponent },
  {path: 'editi/:inventoryId', component: AddInventoryWindowComponent ,canActivate:[AuthGuard]},

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
