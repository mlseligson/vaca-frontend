import { TestBed } from '@angular/core/testing';

import { TripsResolverService } from './trips-resolver.service';

describe('TripsResolverService', () => {
  let service: TripsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
