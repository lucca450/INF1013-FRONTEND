import { TestBed } from '@angular/core/testing';

import { FollowedByService } from './followed-by.service';

describe('FollowedByService', () => {
  let service: FollowedByService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowedByService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
