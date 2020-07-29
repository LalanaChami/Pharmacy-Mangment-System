import { Sales } from 'src/app/mainwindow/a-pointofsale-window/sales.model';
import { Subscription } from 'rxjs';
import { SalesInteractionService } from './../../a-pointofsale-window/sales-interaction.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements OnInit  {
  searchTerm : string;
  saleso  : any;
  isLoading= false;
  private salesSubs: Subscription;
  arr=[
    ["2012", 900, 390],
    ["2013", 1000, 400],
    ["2014", 1170, 440],
    ["2015", 1250, 480],
    ["2016", 1530, 540]
];
arr2 :[];

  constructor(private salesInteractionService: SalesInteractionService) { }

  ngOnInit() {

    this.isLoading = true;
    this.salesInteractionService.getSalesChartInfo();
    this.salesSubs= this.salesInteractionService.getSalesChartUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.saleso = posts;

      });



console.log(this.arr2.push[(this.saleso)]);
  }




        title = 'Population (in millions)';
        type = 'BarChart';
        data = this.arr;
        columnNames = ['Year', 'Asia','Europe'];
        options = {
            hAxis: {
              title: 'Year'
            },
            vAxis:{
              minValue:0
            }
        };
        width = 550;
        height = 400;

}
