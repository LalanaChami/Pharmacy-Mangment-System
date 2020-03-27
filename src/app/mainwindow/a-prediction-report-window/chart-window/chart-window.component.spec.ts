import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWindowComponent } from './chart-window.component';

describe('ChartWindowComponent', () => {
  let component: ChartWindowComponent;
  let fixture: ComponentFixture<ChartWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
