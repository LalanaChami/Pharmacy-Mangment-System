import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutToOutofStockItemsComponent } from './about-to-outof-stock-items.component';

describe('AboutToOutofStockItemsComponent', () => {
  let component: AboutToOutofStockItemsComponent;
  let fixture: ComponentFixture<AboutToOutofStockItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutToOutofStockItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutToOutofStockItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
