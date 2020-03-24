import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSupplierWindowComponent } from './search-supplier-window.component';

describe('SearchSupplierWindowComponent', () => {
  let component: SearchSupplierWindowComponent;
  let fixture: ComponentFixture<SearchSupplierWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSupplierWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSupplierWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
