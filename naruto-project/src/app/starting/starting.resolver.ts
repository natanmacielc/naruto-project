import {ResolveFn} from '@angular/router';
import {CognitoService} from "../service/cognito/cognito.service";
import {inject} from "@angular/core";
import {catchError, map, of, throwError, timeout, TimeoutError} from "rxjs";

export const startingResolver: ResolveFn<string> = (route, state) => {
  const cognito: CognitoService = inject(CognitoService);
  return cognito.isAuthenticated()
    .pipe(
      timeout({each: 5000, with: () => throwError(() => new TimeoutError())}),
      catchError((err) => {
        console.error(err);
        return of(false);
      }),
      map((isAuthenticated: boolean) => isAuthenticated ? 'user-details' : 'signin')
    );
};
