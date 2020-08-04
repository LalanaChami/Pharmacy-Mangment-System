import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XExpiredDialogBoxComponent } from './x-expired-dialog-box.component';

describe('XExpiredDialogBoxComponent', () => {
  let component: XExpiredDialogBoxComponent;
  let fixture: ComponentFixture<XExpiredDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XExpiredDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XExpiredDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
