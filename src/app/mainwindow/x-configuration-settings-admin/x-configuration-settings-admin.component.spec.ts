import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XConfigurationSettingsAdminComponent } from './x-configuration-settings-admin.component';

describe('XConfigurationSettingsAdminComponent', () => {
  let component: XConfigurationSettingsAdminComponent;
  let fixture: ComponentFixture<XConfigurationSettingsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XConfigurationSettingsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XConfigurationSettingsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
