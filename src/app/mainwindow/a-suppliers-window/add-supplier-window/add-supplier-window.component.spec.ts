import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierWindowComponent } from './add-supplier-window.component';

describe('AddSupplierWindowComponent', () => {
  let component: AddSupplierWindowComponent;
  let fixture: ComponentFixture<AddSupplierWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
