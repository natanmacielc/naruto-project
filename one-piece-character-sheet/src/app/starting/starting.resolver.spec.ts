import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { startingResolver } from './starting.resolver';

describe('startingResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => startingResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
