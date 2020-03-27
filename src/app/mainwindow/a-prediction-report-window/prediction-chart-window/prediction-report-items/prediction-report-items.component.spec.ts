import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionReportItemsComponent } from './prediction-report-items.component';

describe('PredictionReportItemsComponent', () => {
  let component: PredictionReportItemsComponent;
  let fixture: ComponentFixture<PredictionReportItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionReportItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionReportItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
