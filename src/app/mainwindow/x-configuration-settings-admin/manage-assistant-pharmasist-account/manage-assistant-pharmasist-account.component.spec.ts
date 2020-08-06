import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssistantPharmasistAccountComponent } from './manage-assistant-pharmasist-account.component';

describe('ManageAssistantPharmasistAccountComponent', () => {
  let component: ManageAssistantPharmasistAccountComponent;
  let fixture: ComponentFixture<ManageAssistantPharmasistAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAssistantPharmasistAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssistantPharmasistAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
