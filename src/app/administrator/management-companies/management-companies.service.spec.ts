import { TestBed } from '@angular/core/testing';

import { ManagementCompaniesService } from './management-companies.service';

describe('ManagementCompaniesService', () => {
  let service: ManagementCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
