import {Component} from '@angular/core';
import {FooterComponent} from "../shared/footer/footer.component";
import {HeaderComponent} from "../shared/header/header.component";
import {ShipComponent} from "../signup/ship/ship.component";
import {SignupFormComponent} from "../signup/signup-form/signup-form.component";
import {OpContainerComponent} from "../shared/op-container/op-container.component";
import {TypingEffectComponent} from "../shared/typing-effect/typing-effect.component";
import {CommonModule, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CognitoService, UserSignIn, UserSignUp} from "../service/cognito/cognito.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first, switchMap} from "rxjs";

@Component({
  selector: 'app-user-verification',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    ShipComponent,
    SignupFormComponent,
    OpContainerComponent,
    TypingEffectComponent,
    NgIf,
    FormsModule,
    CommonModule
  ],
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss'
})
export class UserVerificationComponent {
  readonly code: string[] = Array(6).fill('');
  readonly inputs: number[] = Array(6).fill(0);
  isCodeInputted: boolean = false;
  isCodeResend: boolean = false;
  userInput!: UserSignUp;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cognito: CognitoService
  ) {
    this._route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      this.userInput = resolvedData as UserSignUp;
    })
  }

  onInput(event: any, index: number): void {
    const input: HTMLInputElement = event.target;
    if (input.value.length === 1 && index < 5) {
      this.moveToNextInput(input);
    }

    if (input.value.length > 1) {
      input.value = input.value.charAt(0);
    }

    if (index === 5) {
      this.checkAllInputsFilled();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    if (event.key === 'ArrowLeft' && index > 0) {
      this.moveToPreviousInput(input);
    } else if (event.key === 'ArrowRight' && index < 5) {
      this.moveToNextInput(input);
    } else if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        this.moveToPreviousInput(input);
      } else {
        input.value = '';
      }
    } else if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  checkAllInputsFilled(): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="text"]');
    let allFilled: boolean = true;
    let firstEmptyInput: HTMLInputElement | null = null;
    for (let i: number = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        allFilled = false;
        if (!firstEmptyInput) {
          firstEmptyInput = inputs[i];
        }
      }
    }
    const errorMessage: HTMLElement | null = document.getElementById('error-message');
    if (!allFilled && firstEmptyInput) {
      firstEmptyInput.focus();
      if (errorMessage) {
        errorMessage.style.display = 'block';
      }
    } else {
      if (errorMessage) {
        errorMessage.style.display = 'none';
      }
      this.confirmSignup(inputs);
    }
  }

  confirmSignup(inputs: NodeListOf<HTMLInputElement>, confirmationCode: string = ''): void {
    inputs.forEach((input: HTMLInputElement) => confirmationCode = confirmationCode.concat(input.value))
    this._cognito.confirmSignUp(this.userInput, confirmationCode)
      .pipe(first(),
        switchMap(() => this._cognito.signIn({
          email: this.userInput.email,
          password: this.userInput.password
        } as UserSignIn)))
      .subscribe({
        next: () => this._router.navigate(['user-details']),
        error: () => this._router.navigate(['signin'])
      });
  }

  moveToNextInput(input: HTMLInputElement): void {
    const nextInput: HTMLInputElement | null = input.nextElementSibling as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }

  moveToPreviousInput(input: HTMLInputElement): void {
    const prevInput: HTMLInputElement | null = input.previousElementSibling as HTMLInputElement;
    if (prevInput) {
      prevInput.focus();
    }
  }

  toSignup(): void {
    this._router.navigate(['signup']);
  }

  resendSignUpCode(): void {
    this._cognito.resendSignUpCode(this.userInput)
      .pipe(first())
      .subscribe(() => this.isCodeResend = true);
  }
}
