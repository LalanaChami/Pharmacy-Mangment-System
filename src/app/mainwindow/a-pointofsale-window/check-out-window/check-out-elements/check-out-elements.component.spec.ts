import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutElementsComponent } from './check-out-elements.component';

describe('CheckOutElementsComponent', () => {
  let component: CheckOutElementsComponent;
  let fixture: ComponentFixture<CheckOutElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
