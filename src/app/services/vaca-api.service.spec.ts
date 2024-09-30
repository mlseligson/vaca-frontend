import { TestBed } from '@angular/core/testing';

import { VacaApiService } from './vaca-api.service';

describe('VacaApiService', () => {
  let service: VacaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
