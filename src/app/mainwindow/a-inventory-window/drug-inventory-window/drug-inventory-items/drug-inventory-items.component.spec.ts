import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugInventoryItemsComponent } from './drug-inventory-items.component';

describe('DrugInventoryItemsComponent', () => {
  let component: DrugInventoryItemsComponent;
  let fixture: ComponentFixture<DrugInventoryItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugInventoryItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugInventoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
