import { TestBed } from '@angular/core/testing';

import { SupplierInteractionService } from './supplier-interaction.service';

describe('SupplierInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierInteractionService = TestBed.get(SupplierInteractionService);
    expect(service).toBeTruthy();
  });
});
