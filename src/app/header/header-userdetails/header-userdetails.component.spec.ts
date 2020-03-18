import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserdetailsComponent } from './header-userdetails.component';

describe('HeaderUserdetailsComponent', () => {
  let component: HeaderUserdetailsComponent;
  let fixture: ComponentFixture<HeaderUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
