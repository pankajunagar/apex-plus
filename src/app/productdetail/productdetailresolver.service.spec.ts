import { TestBed } from '@angular/core/testing';

import { ProductdetailresolverService } from './productdetailresolver.service';

describe('ProductdetailresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductdetailresolverService = TestBed.get(ProductdetailresolverService);
    expect(service).toBeTruthy();
  });
});
