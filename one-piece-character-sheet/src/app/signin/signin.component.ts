import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OpContainerComponent} from "../shared/op-container/op-container.component";
import {HeaderComponent} from "../shared/header/header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {Router} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {CognitoService, UserSignIn} from '../service/cognito/cognito.service';
import {first} from "rxjs";
import {SunWarriorComponent} from "../shared/sun-warrior/sun-warrior.component";
import {AuthError} from "aws-amplify/auth";
import {AmplifyError} from '@aws-amplify/core/internals/utils';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OpContainerComponent,
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    SunWarriorComponent,
    SunWarriorComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  private readonly _router: Router = inject(Router);
  private readonly _cognito: CognitoService = inject(CognitoService);
  signInForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  buttonText: string = 'Entrar';

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  signIn(): void {
    this.turnLoader();
    const userSignIn: UserSignIn = this.signInForm.value;
    this._cognito.signIn(userSignIn)
      .pipe(first())
      .subscribe({
        next: () => this._router.navigate(['user-details']),
        error: (error: AmplifyError) => this.showErrorMessage(error)
      });
    setTimeout(() => this.turnLoader(), 1000)
  }

  turnLoader(): void {
    this.isLoading = !this.isLoading;
    this.buttonText = this.isLoading ? 'Entrando...' : 'Entrar';
  }

  showErrorMessage(error: AmplifyError): void {
    const standardErrorMessage: string = 'Ocorreu um erro durante sua solicitação.';
    if (error instanceof AuthError) {
      const authError: AuthError = error as AuthError;
      this.errorMessage = authError.message === 'Incorrect username or password.' ?
        'Nome de usuário ou senha incorreta.' :
        standardErrorMessage;
    } else {
      this.errorMessage = standardErrorMessage;
    }
  }

  toSignUp(): void {
    this._router.navigate(['signup']);
  }

  closeErrorMessage(): void {
    this.errorMessage = '';
  }
}
