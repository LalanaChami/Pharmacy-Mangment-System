import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtasuPopupComponent } from './etasu-popup.component';

describe('EtasuPopupComponent', () => {
  let component: EtasuPopupComponent;
  let fixture: ComponentFixture<EtasuPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtasuPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtasuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
