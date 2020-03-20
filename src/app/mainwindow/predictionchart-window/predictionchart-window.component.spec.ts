import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionchartWindowComponent } from './predictionchart-window.component';

describe('PredictionchartWindowComponent', () => {
  let component: PredictionchartWindowComponent;
  let fixture: ComponentFixture<PredictionchartWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionchartWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionchartWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
