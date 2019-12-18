import { TestBed } from '@angular/core/testing';

import { UserServService } from './user-serv.service';

describe('UserServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserServService = TestBed.get(UserServService);
    expect(service).toBeTruthy();
  });
});
