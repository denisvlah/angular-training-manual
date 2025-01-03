import { TestBed } from '@angular/core/testing';

import { AccountClientService } from './account-client.service';

describe('AccountClientService', () => {
  let service: AccountClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
