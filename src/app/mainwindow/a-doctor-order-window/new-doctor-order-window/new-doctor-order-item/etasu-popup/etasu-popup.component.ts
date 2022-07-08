import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-etasu-popup',
  templateUrl: './etasu-popup.component.html',
  styleUrls: ['./etasu-popup.component.css']
})
export class EtasuPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : {order: any}) { }

  ngOnInit(): void {
  }

}
