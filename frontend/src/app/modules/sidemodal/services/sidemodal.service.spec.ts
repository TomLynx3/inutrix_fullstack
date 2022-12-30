import { TestBed } from '@angular/core/testing';

import { SidemodalService } from './sidemodal.service';

describe('SidemodalService', () => {
  let service: SidemodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidemodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
