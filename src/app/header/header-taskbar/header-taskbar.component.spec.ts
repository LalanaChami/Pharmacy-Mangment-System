import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTaskbarComponent } from './header-taskbar.component';

describe('HeaderTaskbarComponent', () => {
  let component: HeaderTaskbarComponent;
  let fixture: ComponentFixture<HeaderTaskbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTaskbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
