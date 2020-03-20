import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDoctorOrderItemComponent } from './new-doctor-order-item.component';

describe('NewDoctorOrderItemComponent', () => {
  let component: NewDoctorOrderItemComponent;
  let fixture: ComponentFixture<NewDoctorOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDoctorOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDoctorOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
