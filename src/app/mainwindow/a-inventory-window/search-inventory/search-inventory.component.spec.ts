import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInventoryComponent } from './search-inventory.component';

describe('SearchInventoryComponent', () => {
  let component: SearchInventoryComponent;
  let fixture: ComponentFixture<SearchInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
