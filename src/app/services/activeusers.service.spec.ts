import { TestBed } from '@angular/core/testing';

import { ActiveusersService } from './services/activeusers.service';

describe('ActiveusersService', () => {
  let service: ActiveusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
