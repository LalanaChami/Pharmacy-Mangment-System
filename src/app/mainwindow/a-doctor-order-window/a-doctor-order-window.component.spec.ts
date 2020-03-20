import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADoctorOrderWindowComponent } from './a-doctor-order-window.component';

describe('ADoctorOrderWindowComponent', () => {
  let component: ADoctorOrderWindowComponent;
  let fixture: ComponentFixture<ADoctorOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADoctorOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADoctorOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
