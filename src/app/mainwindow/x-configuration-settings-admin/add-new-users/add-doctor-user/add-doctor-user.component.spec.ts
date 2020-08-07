import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorUserComponent } from './add-doctor-user.component';

describe('AddDoctorUserComponent', () => {
  let component: AddDoctorUserComponent;
  let fixture: ComponentFixture<AddDoctorUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctorUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
