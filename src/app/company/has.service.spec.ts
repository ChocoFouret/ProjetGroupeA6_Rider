import { TestBed } from '@angular/core/testing';

import { HasService } from './has.service';

describe('HasService', () => {
  let service: HasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
