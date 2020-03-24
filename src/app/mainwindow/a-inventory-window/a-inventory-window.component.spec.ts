import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AInventoryWindowComponent } from './a-inventory-window.component';

describe('AInventoryWindowComponent', () => {
  let component: AInventoryWindowComponent;
  let fixture: ComponentFixture<AInventoryWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AInventoryWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AInventoryWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
