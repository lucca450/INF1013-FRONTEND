import { TestBed } from '@angular/core/testing';

import { WorkCityService } from './work-city.service';

describe('WorkCityService', () => {
  let service: WorkCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
