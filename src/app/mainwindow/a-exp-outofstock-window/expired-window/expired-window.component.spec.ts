import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredWindowComponent } from './expired-window.component';

describe('ExpiredWindowComponent', () => {
  let component: ExpiredWindowComponent;
  let fixture: ComponentFixture<ExpiredWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
