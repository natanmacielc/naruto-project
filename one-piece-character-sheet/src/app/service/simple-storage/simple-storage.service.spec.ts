import { TestBed } from '@angular/core/testing';

import { SimpleStorageService } from './simple-storage.service';

describe('SimpleStorageService', () => {
  let service: SimpleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
