import { SalesInteractionService } from './../../a-pointofsale-window/sales-interaction.service';
import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-chart-window',
  templateUrl: './chart-window.component.html',
  styleUrls: ['./chart-window.component.css']
})
export class ChartWindowComponent implements OnInit {

  arr: Array<any> =[];
  linearModel: tf.Sequential;
  prediction: any;

  constructor(private salesInteractionService :SalesInteractionService) {}

  ngOnInit() {

    this.salesInteractionService.getSalesChartInfo2().subscribe(results =>{
      results.sales.map(chart =>{

        this.arr.push(+chart.total)
      })
    });
    console.log(this.arr);


    this.train(this.arr);
  }

  async train(mainArray: Array<any> =[]): Promise<any> {

    let length = mainArray.length;

    let total=mainArray[length-3]+mainArray[length-2]+mainArray[length-1]+mainArray[length];

    console.log(total)

    console.log(mainArray);
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


  public predict(val: number) {

    const output = this.linearModel.predict(tf.tensor2d([val], [1, 1])) as any;
    this.prediction = Array.from(output.dataSync())[0];

    console.log(this.prediction);
  }

}

