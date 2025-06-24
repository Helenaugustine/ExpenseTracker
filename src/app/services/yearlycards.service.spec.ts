import { TestBed } from '@angular/core/testing';

import { YearlycardsService } from './yearlycards.service';

describe('YearlycardsService', () => {
  let service: YearlycardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearlycardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
