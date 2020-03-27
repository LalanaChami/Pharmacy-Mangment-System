import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfStockWindowComponent } from './out-of-stock-window.component';

describe('OutOfStockWindowComponent', () => {
  let component: OutOfStockWindowComponent;
  let fixture: ComponentFixture<OutOfStockWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutOfStockWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutOfStockWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
