import { TestBed } from '@angular/core/testing';

import { NikaLoaderService } from './nika-loader.service';

describe('NikaLoaderService', () => {
  let service: NikaLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NikaLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
