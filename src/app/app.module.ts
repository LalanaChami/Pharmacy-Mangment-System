import { XExpiredDialogBoxComponent } from './mainwindow/x-expired-dialog-box/x-expired-dialog-box.component';
import { DoctorOderServices } from './mainwindow/a-inventory-window/a-shopping-cart-window/DoctorOderServices.service';
import { AuthDoctorUserService } from './auth/doctorAuth/authDoctorUser.service';
import { DoctorSignupComponent } from './auth/doctorAuth/doctorSignup/doctorSignup.component';
import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { GoogleChartsModule } from 'angular-google-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, MatInputModule, MatDialogModule, MatButtonModule, MatButton, MatRadioModule, MatSnackBarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderUserdetailsComponent } from './header/header-userdetails/header-userdetails.component';
import { HeaderTaskbarComponent } from './header/header-taskbar/header-taskbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MenuitemComponent } from './sidemenu/menuitem/menuitem.component';
import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { StatPanelComponent } from './mainwindow/stat-panel/stat-panel.component';
import { ExpiredateWindowComponent } from './mainwindow/expiredate-window/expiredate-window.component';
import { ExpiredateWindowItemComponent } from './mainwindow/expiredate-window/expiredate-window-item/expiredate-window-item.component';
import { SaleschartWindowComponent } from './mainwindow/saleschart-window/saleschart-window.component';
import { from } from 'rxjs';
import { OutofstockWindowComponent } from './mainwindow/outofstock-window/outofstock-window.component';
import { OutofstockWindowItemComponent } from './mainwindow/outofstock-window/outofstock-window-item/outofstock-window-item.component';
import { PredictionchartWindowComponent } from './mainwindow/predictionchart-window/predictionchart-window.component';
import { SalesdetailsWindowComponent } from './mainwindow/salesdetails-window/salesdetails-window.component';
import { SalesdetailsItemsComponent } from './mainwindow/salesdetails-window/salesdetails-items/salesdetails-items.component';
import { ADoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/a-doctor-order-window.component';
import { NewDoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/new-doctor-order-window/new-doctor-order-window.component';
import { VerifiedDoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/verified-doctor-order-window/verified-doctor-order-window.component';
import { PickupOrderWindowComponent } from './mainwindow/a-doctor-order-window/pickup-order-window/pickup-order-window.component';
import { NewDoctorOrderItemComponent } from './mainwindow/a-doctor-order-window/new-doctor-order-window/new-doctor-order-item/new-doctor-order-item.component';
import { VerifiedDoctorOrderItemComponent } from './mainwindow/a-doctor-order-window/verified-doctor-order-window/verified-doctor-order-item/verified-doctor-order-item.component';
import { PickupOrderItemComponent } from './mainwindow/a-doctor-order-window/pickup-order-window/pickup-order-item/pickup-order-item.component';
import { APointofsaleWindowComponent } from './mainwindow/a-pointofsale-window/a-pointofsale-window.component';
import { AddToBillComponent } from './mainwindow/a-pointofsale-window/add-to-bill/add-to-bill.component';
import { BillWindowComponent } from './mainwindow/a-pointofsale-window/bill-window/bill-window.component';
import { BillItemComponent } from './mainwindow/a-pointofsale-window/bill-window/bill-item/bill-item.component';
import { CheckOutWindowComponent } from './mainwindow/a-pointofsale-window/check-out-window/check-out-window.component';
import { CheckOutElementsComponent } from './mainwindow/a-pointofsale-window/check-out-window/check-out-elements/check-out-elements.component';
import { ASuppliersWindowComponent } from './mainwindow/a-suppliers-window/a-suppliers-window.component';
import { AddSupplierWindowComponent } from './mainwindow/a-suppliers-window/add-supplier-window/add-supplier-window.component';
import { SupplierInventoryWindowComponent } from './mainwindow/a-suppliers-window/supplier-inventory-window/supplier-inventory-window.component';
import { SearchSupplierWindowComponent } from './mainwindow/a-suppliers-window/search-supplier-window/search-supplier-window.component';
import { AddSupplierElementsComponent } from './mainwindow/a-suppliers-window/add-supplier-window/add-supplier-elements/add-supplier-elements.component';
import { SupplierInventoryItemsComponent } from './mainwindow/a-suppliers-window/supplier-inventory-window/supplier-inventory-items/supplier-inventory-items.component';
import { AInventoryWindowComponent } from './mainwindow/a-inventory-window/a-inventory-window.component';
import { SearchInventoryComponent } from './mainwindow/a-inventory-window/search-inventory/search-inventory.component';
import { AddInventoryWindowComponent } from './mainwindow/a-inventory-window/add-inventory-window/add-inventory-window.component';
import { AddInventoryElementsComponent } from './mainwindow/a-inventory-window/add-inventory-window/add-inventory-elements/add-inventory-elements.component';
import { DrugInventoryWindowComponent } from './mainwindow/a-inventory-window/drug-inventory-window/drug-inventory-window.component';
import { DrugInventoryItemsComponent } from './mainwindow/a-inventory-window/drug-inventory-window/drug-inventory-items/drug-inventory-items.component';
import { APredictionReportWindowComponent } from './mainwindow/a-prediction-report-window/a-prediction-report-window.component';
import { PredictionChartWindowComponent } from './mainwindow/a-prediction-report-window/prediction-chart-window/prediction-chart-window.component';
import { ChartWindowComponent } from './mainwindow/a-prediction-report-window/chart-window/chart-window.component';
import { PredictionChartItemsComponent } from './mainwindow/a-prediction-report-window/chart-window/prediction-chart-items/prediction-chart-items.component';
import { PredictionReportItemsComponent } from './mainwindow/a-prediction-report-window/prediction-chart-window/prediction-report-items/prediction-report-items.component';
import { ASalesWindowComponent } from './mainwindow/a-sales-window/a-sales-window.component';
import { SalesChartComponent } from './mainwindow/a-sales-window/sales-chart/sales-chart.component';
import { SalesReportComponent } from './mainwindow/a-sales-window/sales-report/sales-report.component';
import { SalesReportItemsComponent } from './mainwindow/a-sales-window/sales-report/sales-report-items/sales-report-items.component';
import { AExpOutofstockWindowComponent } from './mainwindow/a-exp-outofstock-window/a-exp-outofstock-window.component';
import { ExpiredWindowComponent } from './mainwindow/a-exp-outofstock-window/expired-window/expired-window.component';
import { ExpiredItemsComponent } from './mainwindow/a-exp-outofstock-window/expired-window/expired-items/expired-items.component';
import { OutOfStockWindowComponent } from './mainwindow/a-exp-outofstock-window/out-of-stock-window/out-of-stock-window.component';
import { OutofstockItemsComponent } from './mainwindow/a-exp-outofstock-window/out-of-stock-window/outofstock-items/outofstock-items.component';
import { AboutToExpireWindowComponent } from './mainwindow/a-exp-outofstock-window/about-to-expire-window/about-to-expire-window.component';
import { AboutToExpireItemsComponent } from './mainwindow/a-exp-outofstock-window/about-to-expire-window/about-to-expire-items/about-to-expire-items.component';
import { AboutToFinishWindowComponent } from './mainwindow/a-exp-outofstock-window/about-to-finish-window/about-to-finish-window.component';
import { AboutToFinishItemsComponent } from './mainwindow/a-exp-outofstock-window/about-to-finish-window/about-to-finish-items/about-to-finish-items.component';
//import { AShoppingCartWindowComponent } from './mainwindow/a-inventory-window/a-shopping-cart-window/a-shopping-cart-window.component';
import { AShoppingCartWindowComponent } from './mainwindow/a-inventory-window/a-shopping-cart-window/a-shopping-cart-window.component';
import { AShoppingCartItemsComponent } from './mainwindow/a-inventory-window/a-shopping-cart-window/a-shopping-cart-items/a-shopping-cart-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { SupplierFilterPipe } from './mainwindow/a-suppliers-window/supplier-filter.pipe';
import { InventoryFilterPipe } from './mainwindow/a-inventory-window/inventory-filter.pipe';
import { DoctorLoginComponent } from './auth/doctorAuth/doctorLogin/doctorLogin.component';
import { XConfigurationSettingsAdminComponent } from './mainwindow/x-configuration-settings-admin/x-configuration-settings-admin.component';
import { ManageDoctorAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-doctor-account/manage-doctor-account.component';
import { ManageAssistantPharmasistAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-assistant-pharmasist-account/manage-assistant-pharmasist-account.component';
import { ManageCashierAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-cashier-account/manage-cashier-account.component';
import { AddNewUsersComponent } from './mainwindow/x-configuration-settings-admin/add-new-users/add-new-users.component';
import { AddPhamacyUserComponent } from './mainwindow/x-configuration-settings-admin/add-new-users/add-phamacy-user/add-phamacy-user.component';
import { AddDoctorUserComponent } from './mainwindow/x-configuration-settings-admin/add-new-users/add-doctor-user/add-doctor-user.component';
import { AboutToOutofStockWindowComponent } from './mainwindow/about-to-outof-stock-window/about-to-outof-stock-window.component';
import { AboutToOutofStockItemsComponent } from './mainwindow/about-to-outof-stock-window/about-to-outof-stock-items/about-to-outof-stock-items.component';
import { XOutofstockDialogBoxComponent } from './mainwindow/xoutofstock-dialog-box/xoutofstock-dialog-box.component';

const appRoutes: Routes =[
  { path: '',component:  MainwindowComponent},
  { path: 'doctororders',component:  ADoctorOrderWindowComponent },
  { path: 'pos',component:  APointofsaleWindowComponent },
  { path: 'suppliers',component:  ASuppliersWindowComponent },
  { path: 'predictionreport',component:  APredictionReportWindowComponent,canActivate:[AuthGuard] },
  { path: 'salesreport',component:  ASalesWindowComponent,canActivate:[AuthGuard] },
  { path: 'inventory',component:  AInventoryWindowComponent },
  { path: 'expoutofstock',component:  AExpOutofstockWindowComponent },
  { path: 'shoppingcart',component:  AShoppingCartWindowComponent },
  { path: 'settings',component:  XConfigurationSettingsAdminComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderUserdetailsComponent,
    HeaderTaskbarComponent,
    SidemenuComponent,
    MenuitemComponent,
    MainwindowComponent,
    StatPanelComponent,
    ExpiredateWindowComponent,
    ExpiredateWindowItemComponent,
    SaleschartWindowComponent,
    OutofstockWindowComponent,
    OutofstockWindowItemComponent,
    PredictionchartWindowComponent,
    SalesdetailsWindowComponent,
    SalesdetailsItemsComponent,
    ADoctorOrderWindowComponent,
    NewDoctorOrderWindowComponent,
    VerifiedDoctorOrderWindowComponent,
    PickupOrderWindowComponent,
    NewDoctorOrderItemComponent,
    VerifiedDoctorOrderItemComponent,
    PickupOrderItemComponent,
    APointofsaleWindowComponent,
    AddToBillComponent,
    BillWindowComponent,
    BillItemComponent,
    CheckOutWindowComponent,
    CheckOutElementsComponent,
    ASuppliersWindowComponent,
    AddSupplierWindowComponent,
    SupplierInventoryWindowComponent,
    SearchSupplierWindowComponent,
    AddSupplierElementsComponent,
    SupplierInventoryItemsComponent,
    AInventoryWindowComponent,
    SearchInventoryComponent,
    AddInventoryWindowComponent,
    AddInventoryElementsComponent,
    DrugInventoryWindowComponent,
    DrugInventoryItemsComponent,
    APredictionReportWindowComponent,
    PredictionChartWindowComponent,
    ChartWindowComponent,
    PredictionChartItemsComponent,
    PredictionReportItemsComponent,
    ASalesWindowComponent,
    SalesChartComponent,
    SalesReportComponent,
    SalesReportItemsComponent,
    AExpOutofstockWindowComponent,
    ExpiredWindowComponent,
    ExpiredItemsComponent,
    OutOfStockWindowComponent,
    OutofstockItemsComponent,
    AboutToExpireWindowComponent,
    AboutToExpireItemsComponent,
    AboutToFinishWindowComponent,
    AboutToFinishItemsComponent,
    AShoppingCartWindowComponent,
    AShoppingCartItemsComponent,
    LoginComponent,
    SignupComponent,
    SupplierFilterPipe,
    InventoryFilterPipe,
    DoctorLoginComponent,
    DoctorSignupComponent,
    XExpiredDialogBoxComponent,
    XConfigurationSettingsAdminComponent,
    ManageDoctorAccountComponent,
    ManageAssistantPharmasistAccountComponent,
    ManageCashierAccountComponent,
    AddNewUsersComponent,
    AddPhamacyUserComponent,
    AddDoctorUserComponent,
    AboutToOutofStockWindowComponent,
    AboutToOutofStockItemsComponent,
    XOutofstockDialogBoxComponent

  ],
  entryComponents: [
    XExpiredDialogBoxComponent,
    XOutofstockDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    Ng2CarouselamosModule,
    MatFormFieldModule,
    MatSelectModule,
    GoogleChartsModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
