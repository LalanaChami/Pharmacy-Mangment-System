import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToBillComponent } from './add-to-bill.component';

describe('AddToBillComponent', () => {
  let component: AddToBillComponent;
  let fixture: ComponentFixture<AddToBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
