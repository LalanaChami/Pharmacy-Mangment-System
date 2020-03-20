import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutofstockWindowItemComponent } from './outofstock-window-item.component';

describe('OutofstockWindowItemComponent', () => {
  let component: OutofstockWindowItemComponent;
  let fixture: ComponentFixture<OutofstockWindowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutofstockWindowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutofstockWindowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
