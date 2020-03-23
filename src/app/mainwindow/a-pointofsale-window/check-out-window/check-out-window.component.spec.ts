import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutWindowComponent } from './check-out-window.component';

describe('CheckOutWindowComponent', () => {
  let component: CheckOutWindowComponent;
  let fixture: ComponentFixture<CheckOutWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
