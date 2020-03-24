import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierElementsComponent } from './add-supplier-elements.component';

describe('AddSupplierElementsComponent', () => {
  let component: AddSupplierElementsComponent;
  let fixture: ComponentFixture<AddSupplierElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
