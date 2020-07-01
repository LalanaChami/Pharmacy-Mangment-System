import { ADoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/a-doctor-order-window.component';
import { NewDoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/new-doctor-order-window/new-doctor-order-window.component';
import { PickupOrderWindowComponent } from './mainwindow/a-doctor-order-window/pickup-order-window/pickup-order-window.component';
import { VerifiedDoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/verified-doctor-order-window/verified-doctor-order-window.component';
import { DoctorOderServices } from './mainwindow/a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { DoctorSignupComponent } from './auth/doctorAuth/doctorSignup/doctorSignup.component';
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
import { DoctorLoginComponent } from './auth/doctorAuth/doctorLogin/doctorLogin.component';


const routes: Routes = [
  {path: 'suppliers', component: AddSupplierWindowComponent  },
  {path: 'suppliers/create', component: SupplierInventoryWindowComponent },
  {path: 'edit/:supplierId', component: AddSupplierWindowComponent ,canActivate:[AuthGuard]},

  {path: 'inventory', component: AddInventoryWindowComponent },
  {path: 'inventory/create', component: DrugInventoryWindowComponent },
  {path: 'editi/:inventoryId', component: AddInventoryWindowComponent ,canActivate:[AuthGuard]},

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'doctorLogin', component: DoctorLoginComponent},
  {path: 'doctorSignup', component: DoctorSignupComponent},

  {path: 'doctororders/new', component: VerifiedDoctorOrderWindowComponent },
  {path: 'doctororders', component: ADoctorOrderWindowComponent },
  {path: 'doctororders/pickedUp', component: PickupOrderWindowComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
