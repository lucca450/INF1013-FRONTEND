import { TestBed } from '@angular/core/testing';

import { DepartureReasonService } from './departure-reason.service';

describe('DepartureReasonService', () => {
  let service: DepartureReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartureReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
