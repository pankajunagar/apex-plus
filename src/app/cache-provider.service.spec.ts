import { TestBed } from '@angular/core/testing';

import { CacheProviderService } from './cache-provider.service';

describe('CacheProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheProviderService = TestBed.get(CacheProviderService);
    expect(service).toBeTruthy();
  });
});
