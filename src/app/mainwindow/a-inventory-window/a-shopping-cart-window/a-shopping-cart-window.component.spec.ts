import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AShoppingCartWindowComponent } from './a-shopping-cart-window.component';

describe('AShoppingCartWindowComponent', () => {
  let component: AShoppingCartWindowComponent;
  let fixture: ComponentFixture<AShoppingCartWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AShoppingCartWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AShoppingCartWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
