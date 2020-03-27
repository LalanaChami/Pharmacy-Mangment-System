import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredItemsComponent } from './expired-items.component';

describe('ExpiredItemsComponent', () => {
  let component: ExpiredItemsComponent;
  let fixture: ComponentFixture<ExpiredItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
