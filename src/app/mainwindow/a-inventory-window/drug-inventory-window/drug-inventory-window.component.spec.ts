import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugInventoryWindowComponent } from './drug-inventory-window.component';

describe('DrugInventoryWindowComponent', () => {
  let component: DrugInventoryWindowComponent;
  let fixture: ComponentFixture<DrugInventoryWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugInventoryWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugInventoryWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
