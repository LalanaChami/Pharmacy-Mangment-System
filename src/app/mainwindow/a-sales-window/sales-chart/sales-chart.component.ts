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
  arr: Array<any> =[];


  constructor(private salesInteractionService: SalesInteractionService) { }

  ngOnInit() {

    this.isLoading = true;
    this.salesInteractionService.getSalesChartInfo();
    this.salesSubs= this.salesInteractionService.getSalesChartUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false;
        this.saleso = posts;

      });


        this.salesInteractionService.getSalesChartInfo2().subscribe(results =>{
          results.sales.map(chart =>{
            console.log(chart._id);
            this.arr.push([chart._id,chart.total])
          });
        });
console.log(this.arr);
  }




  title = 'Population (in millions)';
  type = 'BarChart';
  data = this.arr;
  columnNames = ['Year', 'Asia'];
  options = { };
  width = 1150;
  height = 400;


}
