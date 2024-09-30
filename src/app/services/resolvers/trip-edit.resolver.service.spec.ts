import { TestBed } from '@angular/core/testing';

import { TripEditResolverService } from './trip-edit.resolver.service';

describe('TripEditResolverService', () => {
  let service: TripEditResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripEditResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
