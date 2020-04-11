import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AShoppingCartItemsComponent } from './a-shopping-cart-items.component';

describe('AShoppingCartItemsComponent', () => {
  let component: AShoppingCartItemsComponent;
  let fixture: ComponentFixture<AShoppingCartItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AShoppingCartItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AShoppingCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
