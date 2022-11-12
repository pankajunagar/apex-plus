import { TestBed } from '@angular/core/testing';

import { NetworkProvider } from './network-provider.service';

describe('NetworkProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkProvider = TestBed.get(NetworkProvider);
    expect(service).toBeTruthy();
  });
});
