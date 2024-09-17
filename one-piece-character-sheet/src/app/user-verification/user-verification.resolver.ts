import {Navigation, ResolveFn, Router} from '@angular/router';
import {Observable, of} from "rxjs";
import {UserSignUp} from "../service/cognito/cognito.service";
import {inject} from "@angular/core";

export const userVerificationResolver: ResolveFn<Observable<UserSignUp>> = (route, state): Observable<UserSignUp> => {
  const router: Router = inject(Router);
  const navigation: Navigation | null = router.getCurrentNavigation();
  if (navigation?.extras.state) {
    return of(navigation.extras.state as UserSignUp);
  }
  return of({email: 'teste123@teste.com', password: 'teste', name: 'Teste'} as UserSignUp)
};
