import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupOrderWindowComponent } from './pickup-order-window.component';

describe('PickupOrderWindowComponent', () => {
  let component: PickupOrderWindowComponent;
  let fixture: ComponentFixture<PickupOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
