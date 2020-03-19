import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredateWindowComponent } from './expiredate-window.component';

describe('ExpiredateWindowComponent', () => {
  let component: ExpiredateWindowComponent;
  let fixture: ComponentFixture<ExpiredateWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredateWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredateWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
