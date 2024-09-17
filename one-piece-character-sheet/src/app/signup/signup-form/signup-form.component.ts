import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {TypingEffectComponent} from "../../shared/typing-effect/typing-effect.component";
import {FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {passwordValidator} from "./password.validator";
import {
  DisabilityDisplay,
  InputValidity,
  PasswordStrength,
  PasswordValidation,
  VisibilityConditions,
  VisibilityDisplay
} from "./signup-form.model";
import {CognitoService, UserSignUp} from "../../service/cognito/cognito.service";
import {Router, RouterModule} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    TypingEffectComponent,
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage,
    RouterModule
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent implements OnInit {
  private readonly EMAIL_ERROR_MESSAGES: Map<string, string> = new Map<string, string>([
    ['required', 'Insira o email'],
    ['email', 'Insira um endereço de email válido']
  ])
  private readonly PASSWORD_PRIORITIES: Map<number, PasswordValidation> = new Map<number, PasswordValidation>([
    [0, {key: 'hasSpecialChar', message: 'A senha deve conter pelo menos um caractere especial'}],
    [1, {key: 'hasNumeric', message: 'A senha deve conter pelo menos um número'}],
    [2, {key: 'hasUpperCase', message: 'A senha deve conter pelo menos um caractere maiúsculo'}],
    [3, {key: 'hasLowerCase', message: 'A senha deve conter pelo menos um caractere minúsculo'}],
    [4, {key: 'isValidLength', message: 'A senha deve conter pelo menos 8 caracteres'}]
  ]);
  private readonly _cognitoService: CognitoService = inject(CognitoService);
  private readonly _router: Router = inject(Router);
  signupForm!: FormGroup;
  showEmailLabel: boolean = false;
  showEmailContinue: boolean = false;
  showPasswordContinue: boolean = false;
  isEmailValid: boolean = false;
  isPasswordValid: boolean = true;
  isUsernameValid: boolean = true;
  showPasswordLabel: boolean = false;
  showUsernameLabel: boolean = false;
  showSubmit: boolean = false;
  isUnfinished: boolean = true;
  errorMessage: string = '';
  isPasswordVisible: boolean = false;
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  @ViewChild('emailInput') emailInputElement!: ElementRef;

  onComplete(event: boolean): void {
    this.showEmailLabel = event;
    this.showEmailContinue = event;
    setTimeout(() => this.emailInputElement.nativeElement.focus(), 50);
    this.validateEmail();
    this.validatePassword();
    this.validateUsername();
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      name: new FormControl('', [Validators.required])
    });
  }

  validateEmail(): void {
    this.isEmailValid = false
    const requiredValidation: string = 'required';
    const emailValidation: string = 'email';
    this.signupForm.get(emailValidation)?.valueChanges.subscribe(() => {
        const emailControl = this.signupForm.get(emailValidation);
        if (emailControl?.hasError(requiredValidation)) {
          this.emailInvalidCase(requiredValidation)
        } else if (emailControl?.hasError(emailValidation)) {
          this.emailInvalidCase(emailValidation)
        } else {
          this.showEmailContinue = true;
          this.showPasswordLabel = false;
          this.showUsernameLabel = false
          this.errorMessage = '';
          this.isEmailValid = true;
          this.emailErrorMessage= '';
        }
      }
    )
  }

  validatePassword(): void {
    this.signupForm.get('password')?.valueChanges.subscribe(() => {
        const errors = this.signupForm.get('password')?.errors;
        if (errors) {
          const validationErrors: ValidationErrors = errors as ValidationErrors;
          const passwordStrength: PasswordStrength = validationErrors['passwordStrength'];
          this.setPasswordErrorMessage(passwordStrength);
          this.isPasswordValid = false;
          this.showPasswordContinue = true;
          this.showUsernameLabel = false;
        } else {
          this.passwordErrorMessage = '';
          this.showPasswordContinue = true;
          this.isPasswordValid = true;
          this.showUsernameLabel = false;
        }
      }
    )
  }

  setPasswordErrorMessage(passwordStrength: PasswordStrength): void {
    let highestPriority: number = 0;
    this.PASSWORD_PRIORITIES.forEach((value, key) => {
      const isInvalid: boolean = !passwordStrength[value.key];
      if (isInvalid) {
        highestPriority = key > highestPriority ? key : highestPriority;
      }
    })
    this.passwordErrorMessage = this.PASSWORD_PRIORITIES.has(highestPriority) ? this.PASSWORD_PRIORITIES.get(highestPriority)!.message : '';
  }

  validateUsername(): void {
    this.signupForm.get('name')?.valueChanges.subscribe(() => {
      const usernameControl = this.signupForm.get('name');
      this.isUsernameValid = !usernameControl?.hasError('required');
    })
  }

  emailInvalidCase(validation: string): void {
    this.isEmailValid = false;
    this.showEmailContinue = true;
    this.errorMessage = this.EMAIL_ERROR_MESSAGES.get(validation) as string
    this.emailErrorMessage = 'Email inválido ou já em uso';
  }

  enablePassword(): void {
    this.showPasswordContinue = true;
    this.isPasswordValid = false
    this.showPasswordLabel = true;
    this.showEmailContinue = false;
  }

  enableUsername(): void {
    this.isUsernameValid = false;
    this.showUsernameLabel = true;
    this.showPasswordContinue = false;
    this.showSubmit = true;
  }

  displayControl(conditions: VisibilityConditions): VisibilityDisplay {
    if (conditions.enableConditions != null) {
      return {
        hidden: conditions.displayConditions.includes(false),
        visible: !conditions.displayConditions.includes(false),
        enabled: !conditions.enableConditions.includes(false),
        disabled: conditions.enableConditions.includes(false)
      } as DisabilityDisplay
    }
    return {
      hidden: conditions.displayConditions.includes(false),
      visible: !conditions.displayConditions.includes(false)
    } as VisibilityDisplay
  }

  inputValidity(isValid: boolean): InputValidity {
    return {
      "arrow-input": true,
      valid: isValid,
      invalid: !isValid
    }
  }

  changeVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (this.signupForm.valid
    ) {
      console.log('Formulário Enviado', this.signupForm.value);
    } else {
      console.log('Formulário inválido');
    }
  }

  onFinish(): void {
    const userInput: UserSignUp = this.signupForm.value;
    this._cognitoService.signUp(userInput).pipe(first()).subscribe();
    this._router.navigate(['user-verification'], {state: userInput});
  }
}
