import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-predictionchart-window',
  templateUrl: './predictionchart-window.component.html',
  styleUrls: ['./predictionchart-window.component.css']
})
export class PredictionchartWindowComponent implements OnInit {

  constructor() { }

  public barChartOptions={
    scaleShowVerticalLines :false,
    responsive: true
  }
  public barChartLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [43,12,34,76,23,67,23,78,45], label:'Sales predictions for upcomming months',backgroundColor:'HSL(171, 100%, 50%)',hoverBackgroundColor:'HSL(171, 100%, 30%) '}
  ];

  ngOnInit() {
  }

}
