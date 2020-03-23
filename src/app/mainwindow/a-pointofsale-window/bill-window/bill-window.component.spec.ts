import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWindowComponent } from './bill-window.component';

describe('BillWindowComponent', () => {
  let component: BillWindowComponent;
  let fixture: ComponentFixture<BillWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
