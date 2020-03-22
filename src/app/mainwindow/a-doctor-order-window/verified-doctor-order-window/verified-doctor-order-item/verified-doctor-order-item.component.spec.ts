import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedDoctorOrderItemComponent } from './verified-doctor-order-item.component';

describe('VerifiedDoctorOrderItemComponent', () => {
  let component: VerifiedDoctorOrderItemComponent;
  let fixture: ComponentFixture<VerifiedDoctorOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedDoctorOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedDoctorOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
