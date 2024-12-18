import {Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {signinGuard} from "./signin/signin.guard";
import {startingResolver} from "./starting/starting.resolver";
import {userVerificationResolver} from "./user/verification/user-verification.resolver";
import {userDetailsResolver} from "./user/details/user-details.resolver";
import {charactersResolver} from "./characters/characters.resolver";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'user-verification',
    resolve: {resolvedData: userVerificationResolver},
    loadComponent: () => import('./user/verification/user-verification.component').then(m => m.UserVerificationComponent)
  },
  {
    path: 'user-details',
    resolve: {resolvedData: userDetailsResolver},
    loadComponent: () => import('./user/details/user-details.component').then(m => m.UserDetailsComponent)
  },
  {
    path: 'signin',
    canActivate: [signinGuard],
    loadComponent: () => import('./signin/signin.component').then(m => m.SigninComponent)
  },
  {
    path: 'starting',
    resolve: {resolvedData: startingResolver},
    loadComponent: () => import('./starting/starting.component').then(m => m.StartingComponent)
  },
  {
    path: 'characters',
    resolve: {resolvedData: charactersResolver},
    loadComponent: () => import('./characters/characters.component').then(m => m.CharactersComponent)
  }
];
