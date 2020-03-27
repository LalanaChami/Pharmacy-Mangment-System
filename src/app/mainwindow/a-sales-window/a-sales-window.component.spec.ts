import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASalesWindowComponent } from './a-sales-window.component';

describe('ASalesWindowComponent', () => {
  let component: ASalesWindowComponent;
  let fixture: ComponentFixture<ASalesWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASalesWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASalesWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
