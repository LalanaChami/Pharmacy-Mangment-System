import { MatSnackBar } from '@angular/material';
import { element } from 'protractor';
import { AuthService } from 'src/app/auth/auth.service';
import { SalesInteractionService } from './../../../a-pointofsale-window/sales-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Sales } from 'src/app/mainwindow/a-pointofsale-window/sales.model';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-sales-report-items',
  templateUrl: './sales-report-items.component.html',
  styleUrls: ['./sales-report-items.component.css']
})
export class SalesReportItemsComponent implements OnInit {

  searchTerm : string;
  sales: Sales[] = [];
  isLoading= false;
  userIsAuthenticated = false;
   salesSubs: Subscription;
   authStatusSub: Subscription;
   isHidden: boolean = true;

  constructor(private salesInteractionService: SalesInteractionService, private authService: AuthService , private snackBar : MatSnackBar){}

  ngOnInit() {
    this.isLoading = true;
    this.salesInteractionService.getSales();
    this.salesSubs = this.salesInteractionService.getSalesUpdateListener()
      .subscribe((posts: Sales[]) => {
        this.isLoading = false;
        this.sales = posts;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  downloard(){
    const options ={
      name: 'output.pdf',
      image: {type: 'jpeg'},
      html2canvas:{},
      jsPDF: {orientation: 'portrait'},
      pagebreak: { mode: 'avoid-all', before: '#page2el' }
    }
    const element:Element = document.getElementById('table')

    this.snackBar.open("Sales Report Downloarding..... ", "Close");
    html2pdf()
            .from(element)
            .set(options)
            .save()
  }



}
