import { TestBed } from '@angular/core/testing';

import { IntervenantService } from './intervenant.service';

describe('IntervenantService', () => {
  let service: IntervenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
