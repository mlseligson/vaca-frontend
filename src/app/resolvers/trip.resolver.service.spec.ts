import { TestBed } from '@angular/core/testing';

import { TripResolverService } from './trip.resolver.service';

describe('TripResolverService', () => {
  let service: TripResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
