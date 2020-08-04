import { SalesInteractionService } from './../../a-pointofsale-window/sales-interaction.service';
import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';



@Component({
  selector: 'app-prediction-chart-window',
  templateUrl: './prediction-chart-window.component.html',
  styleUrls: ['./prediction-chart-window.component.css']
})
export class PredictionChartWindowComponent implements OnInit {

  arr: Array<any> =[];
  linearModel: tf.Sequential;
  prediction: any;

  constructor(  ) { }

  ngOnInit() {



  }



}
