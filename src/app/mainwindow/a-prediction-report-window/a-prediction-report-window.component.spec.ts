import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APredictionReportWindowComponent } from './a-prediction-report-window.component';

describe('APredictionReportWindowComponent', () => {
  let component: APredictionReportWindowComponent;
  let fixture: ComponentFixture<APredictionReportWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APredictionReportWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APredictionReportWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
