import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutToExpireWindowComponent } from './about-to-expire-window.component';

describe('AboutToExpireWindowComponent', () => {
  let component: AboutToExpireWindowComponent;
  let fixture: ComponentFixture<AboutToExpireWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutToExpireWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutToExpireWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
