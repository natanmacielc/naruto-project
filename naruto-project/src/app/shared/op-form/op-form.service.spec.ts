import { TestBed } from '@angular/core/testing';

import { OpFormService } from './op-form.service';

describe('FormFieldsService', () => {
  let service: OpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
