import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutToExpireItemsComponent } from './about-to-expire-items.component';

describe('AboutToExpireItemsComponent', () => {
  let component: AboutToExpireItemsComponent;
  let fixture: ComponentFixture<AboutToExpireItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutToExpireItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutToExpireItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
