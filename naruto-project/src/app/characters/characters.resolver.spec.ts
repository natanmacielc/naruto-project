import {ResolveFn} from '@angular/router';

import {charactersResolver} from './characters.resolver';

describe('charactersResolver', () => {
  const executeResolver: ResolveFn<any> = (...resolverParameters) =>{}
      // TestBed.runInInjectionContext(() => charactersResolver(...resolverParameters));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  // });

  // it('should be created', () => {
  //   expect(executeResolver).toBeTruthy();
  // });
});
