import { AddDoctorUserComponent } from './mainwindow/x-configuration-settings-admin/add-new-users/add-doctor-user/add-doctor-user.component';
import { ManageDoctorAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-doctor-account/manage-doctor-account.component';
import { AddNewUsersComponent } from './mainwindow/x-configuration-settings-admin/add-new-users/add-new-users.component';
import { ManageCashierAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-cashier-account/manage-cashier-account.component';
import { ManageAssistantPharmasistAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-assistant-pharmasist-account/manage-assistant-pharmasist-account.component';
import { SalesChartComponent } from './mainwindow/a-sales-window/sales-chart/sales-chart.component';
import { SalesReportComponent } from './mainwindow/a-sales-window/sales-report/sales-report.component';
import { ASalesWindowComponent } from './mainwindow/a-sales-window/a-sales-window.component';
import { AboutToFinishWindowComponent } from './mainwindow/a-exp-outofstock-window/about-to-finish-window/about-to-finish-window.component';
import { OutOfStockWindowComponent } from './mainwindow/a-exp-outofstock-window/out-of-stock-window/out-of-stock-window.component';
import { AExpOutofstockWindowComponent } from './mainwindow/a-exp-outofstock-window/a-exp-outofstock-window.component';
import { AboutToExpireWindowComponent } from './mainwindow/a-exp-outofstock-window/about-to-expire-window/about-to-expire-window.component';
import { ExpiredWindowComponent } from './mainwindow/a-exp-outofstock-window/expired-window/expired-window.component';
import { AboutToExpireItemsComponent } from './mainwindow/a-exp-outofstock-window/about-to-expire-window/about-to-expire-items/about-to-expire-items.component';
import { ExpiredItemsComponent } from './mainwindow/a-exp-outofstock-window/expired-window/expired-items/expired-items.component';
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
import { XConfigurationSettingsAdminComponent } from './mainwindow/x-configuration-settings-admin/x-configuration-settings-admin.component';


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
  {path: 'doctororders/pickedUp', component: PickupOrderWindowComponent },

  {path: 'expoutofstock', component: AExpOutofstockWindowComponent },
  {path: 'expoutofstock/abouttoexpire', component: AboutToExpireWindowComponent },

  {path: 'outofstock', component: OutOfStockWindowComponent },
  {path: 'outofstock/abouttofinish', component: AboutToFinishWindowComponent },


  {path: 'salesreport', component: SalesChartComponent },
  {path: 'salesreport/report', component: SalesReportComponent },

  {path: 'settings', component: XConfigurationSettingsAdminComponent },
  {path: 'settings/APharmasistAccounts', component: ManageAssistantPharmasistAccountComponent },
  {path: 'settings/CashierAccounts', component: ManageCashierAccountComponent },
  {path: 'settings/DoctorAccount', component: ManageDoctorAccountComponent },
  {path: 'update/:docId', component: AddNewUsersComponent },
  {path: 'updat/:userId', component: AddNewUsersComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
