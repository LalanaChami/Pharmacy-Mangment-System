import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutofstockWindowComponent } from './outofstock-window.component';

describe('OutofstockWindowComponent', () => {
  let component: OutofstockWindowComponent;
  let fixture: ComponentFixture<OutofstockWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutofstockWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutofstockWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
