import { TestBed } from '@angular/core/testing';

import { ResidenceTypeService } from './residence-type.service';

describe('ResidenceTypeService', () => {
  let service: ResidenceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidenceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
