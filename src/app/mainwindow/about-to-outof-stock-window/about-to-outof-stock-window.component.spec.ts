import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutToOutofStockWindowComponent } from './about-to-outof-stock-window.component';

describe('AboutToOutofStockWindowComponent', () => {
  let component: AboutToOutofStockWindowComponent;
  let fixture: ComponentFixture<AboutToOutofStockWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutToOutofStockWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutToOutofStockWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
