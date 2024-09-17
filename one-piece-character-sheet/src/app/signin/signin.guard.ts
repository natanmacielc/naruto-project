import {CanActivateFn, Router} from '@angular/router';
import {CognitoService} from "../service/cognito/cognito.service";
import {inject} from "@angular/core";
import {catchError, interval, map, of, switchMap, tap, throwError, timeout, TimeoutError} from "rxjs";

export const signinGuard: CanActivateFn = (route, state) => {
  const cognito: CognitoService = inject(CognitoService);
  const router: Router = inject(Router);
  return cognito.isAuthenticated()
    .pipe(
      timeout({each: 500, with: () => throwError(() => new TimeoutError())}),
      catchError((err) => {
        console.error(err);
        return of(true);
      }),
      map((isAuthenticated: boolean) => !isAuthenticated),
      tap((notAuthenticated: boolean) => {
        if (!notAuthenticated) {
          router.navigate(['user-details'])
        }
      })
    );
};
