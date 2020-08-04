import { SalesInteractionService } from './../../../a-pointofsale-window/sales-interaction.service';
import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-prediction-chart-items',
  templateUrl: './prediction-chart-items.component.html',
  styleUrls: ['./prediction-chart-items.component.css']
})
export class PredictionChartItemsComponent implements OnInit {

  arr: Array<any> =[];
  linearModel: tf.Sequential;
  prediction: any;
  total:number;

  constructor( private salesInteractionService :SalesInteractionService ) { }

  ngOnInit() {
    this.salesInteractionService.getSalesChartInfo2().subscribe(results =>{
      results.sales.map(chart =>{

        this.arr.push([+chart.total]);


      })
    });
    console.log(this.arr);
let total=0;
    for(let i=0;i<this.arr.length;i++){
      if(i==this.arr.length -3 || i==this.arr.length -2 || i==this.arr.length -1 || i==this.arr.length ){
 total= total + this.arr[i];
      }
      console.log(total)
    }


    this.train();


  }

  async train(): Promise<any> {

    // Define a model for linear regression.
    this.linearModel = tf.sequential();
    this.linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});


    // Training data, completely random stuff
    const xs = tf.tensor1d([3.2, 4.4, 5.5]);
    const ys = tf.tensor1d([1.6, 2.7, 3.5]);

    // Train
    await this.linearModel.fit(xs, ys)

    console.log('model trained!')
  }

  predict(val: Array<any> =[]) {

    const output = this.linearModel.predict(tf.tensor2d([val], [7, 1])) as any;
    this.prediction = Array.from(output.dataSync())[0]
    console.log(this.prediction);
  }

}
