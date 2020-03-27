import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutToFinishItemsComponent } from './about-to-finish-items.component';

describe('AboutToFinishItemsComponent', () => {
  let component: AboutToFinishItemsComponent;
  let fixture: ComponentFixture<AboutToFinishItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutToFinishItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutToFinishItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
