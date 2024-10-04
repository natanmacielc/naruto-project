import {Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {signinGuard} from "./signin/signin.guard";
import {startingResolver} from "./starting/starting.resolver";
import {userVerificationResolver} from "./user/verification/user-verification.resolver";
import {userDetailsResolver} from "./user/details/user-details.resolver";
import {BasicInfoComponent} from "./character/new-character/basic-info/basic-info.component";

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
    path: 'new-character',
    loadComponent: () => import('./character/new-character/new-character.component').then(m => m.NewCharacterComponent),
    children: [
      {
        path: 'basic-info',
        loadComponent: () => import('./character/new-character/basic-info/basic-info.component').then(m => m.BasicInfoComponent)
      },
      {
        path: 'skills',
        loadComponent: () => import('./character/new-character/skills/skills.component').then(m => m.SkillsComponent)
      },
      {
        path: 'items',
        loadComponent: () => import('./character/new-character/items/items.component').then(m => m.ItemsComponent)
      }
    ]
  },
];
