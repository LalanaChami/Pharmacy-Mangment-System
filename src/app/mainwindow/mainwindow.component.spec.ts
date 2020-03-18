import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainwindowComponent } from './mainwindow.component';

describe('MainwindowComponent', () => {
  let component: MainwindowComponent;
  let fixture: ComponentFixture<MainwindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainwindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
