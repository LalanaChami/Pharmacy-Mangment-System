import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleschartWindowComponent } from './saleschart-window.component';





describe('SaleschartWindowComponent', () => {
  let component: SaleschartWindowComponent;
  let fixture: ComponentFixture<SaleschartWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleschartWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleschartWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});







