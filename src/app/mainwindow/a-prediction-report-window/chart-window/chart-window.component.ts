import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-window',
  templateUrl: './chart-window.component.html',
  styleUrls: ['./chart-window.component.css']
})
export class ChartWindowComponent implements OnInit {


  // ADD CHART OPTIONS.
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: '1st Year',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59]
    },
    {
      label: '2nd Year',
      data: [47, 9, 28, 54, 77, 51, 24]
    }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]

  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }






  // public barChartOptions={
  //   scaleShowVerticalLines :false,
  //   responsive: true
  // }
  // public barChartLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   {data: [43,12,34,76,23,67,23,78,45], label:'Sales predictions for upcomming months',backgroundColor:'HSL(171, 100%, 50%)',hoverBackgroundColor:'HSL(171, 100%, 30%) '}
  // ];




  constructor() {
    function addChart(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
  }; }

  ngOnInit() {
  }

}
// function addChart(chart, label, data) {
//   chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset) => {
//       dataset.data.push(data);
//   });
//   chart.update();
// };
