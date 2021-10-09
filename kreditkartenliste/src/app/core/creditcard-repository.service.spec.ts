import { TestBed } from '@angular/core/testing';

import { CreditcardRepositoryService } from './creditcard-repository.service';

describe('CreditcardRepositoryService', () => {
  let service: CreditcardRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditcardRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
