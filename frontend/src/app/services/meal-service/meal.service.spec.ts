import { TestBed } from '@angular/core/testing';

import { MealServiceService } from './meal.service';

describe('MealServiceService', () => {
  let service: MealServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
