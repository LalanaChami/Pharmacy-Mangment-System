import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionChartItemsComponent } from './prediction-chart-items.component';

describe('PredictionChartItemsComponent', () => {
  let component: PredictionChartItemsComponent;
  let fixture: ComponentFixture<PredictionChartItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionChartItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionChartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
