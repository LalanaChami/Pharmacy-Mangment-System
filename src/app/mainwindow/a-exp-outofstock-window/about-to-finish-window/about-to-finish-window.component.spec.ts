import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutToFinishWindowComponent } from './about-to-finish-window.component';

describe('AboutToFinishWindowComponent', () => {
  let component: AboutToFinishWindowComponent;
  let fixture: ComponentFixture<AboutToFinishWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutToFinishWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutToFinishWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
