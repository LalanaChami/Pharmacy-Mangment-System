import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryWindowComponent } from './add-inventory-window.component';

describe('AddInventoryWindowComponent', () => {
  let component: AddInventoryWindowComponent;
  let fixture: ComponentFixture<AddInventoryWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInventoryWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInventoryWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
