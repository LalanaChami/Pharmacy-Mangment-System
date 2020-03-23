import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
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


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
