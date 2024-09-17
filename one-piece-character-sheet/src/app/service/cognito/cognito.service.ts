import {Injectable} from '@angular/core';
import {
  confirmSignUp,
  fetchAuthSession,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
  fetchUserAttributes,
  AuthSession,
  ConfirmSignUpOutput,
  ResendSignUpCodeOutput,
  SignInOutput,
  SignUpOutput,
  FetchUserAttributesOutput
} from "aws-amplify/auth"
import {catchError, from, map, Observable, of, tap, throwError, timeout, TimeoutError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
  }

  public signUp(userInput: UserSignUp): Observable<SignUpOutput> {
    return from(signUp({
      username: userInput.email,
      password: userInput.password,
      options: {
        userAttributes: {
          email: userInput.email,
          name: userInput.name,
        },
      },
    })).pipe(
      tap(({isSignUpComplete, userId, nextStep}) => {
        console.log(`isSignUpComplete: ${isSignUpComplete}, userId: ${userId}, nextStep: ${nextStep}`);
      }),
      catchError((error) => {
        console.error('Erro no cadastro:', error);
        throw error;
      })
    );
  }

  public confirmSignUp(userInput: UserSignUp, confirmationCode: string): Observable<ConfirmSignUpOutput> {
    return from(confirmSignUp({
      username: userInput.email,
      confirmationCode: confirmationCode
    })).pipe(
      tap(({isSignUpComplete, nextStep}) => {
        console.log(`isSignUpComplete: ${isSignUpComplete}, nextStep: ${nextStep}`);
      }),
      catchError((error) => {
        console.error('Erro no confirmSignUp:', error);
        throw error;
      })
    );
  }

  public resendSignUpCode(userInput: UserSignUp): Observable<ResendSignUpCodeOutput> {
    return from(resendSignUpCode({
      username: userInput.email,
    })).pipe(
      tap(({destination, deliveryMedium, attributeName}) => {
        console.log(`destination: ${destination}, deliveryMedium: ${deliveryMedium}, attributeName ${attributeName}`);
      }),
      catchError((error) => {
        console.error('Erro no resendSignUpCode:', error);
        throw error;
      })
    );
  }

  public signIn(userInput: UserSignIn): Observable<SignInOutput> {
    return from(signIn({
      username: userInput.email,
      password: userInput.password
    })).pipe(
      tap((nextStep) => {
        console.log(`nextStep: ${nextStep}`);
      }),
      catchError((error) => {
        console.error('Erro no signIn:', error);
        throw error;
      })
    );
  }

  public signOut(): Observable<void> {
    return from(signOut()).pipe(
      catchError((error) => {
        console.error('Erro no signOut:', error);
        throw error;
      })
    );
  }

  public retrieveSession(): Observable<AuthSession> {
    return from(fetchAuthSession()).pipe(
      catchError((error) => {
        console.error('Erro no cadastro:', error);
        throw error;
      })
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.retrieveSession()
      .pipe(
        map((session: AuthSession): boolean => session.tokens?.accessToken.payload.exp! > Math.floor(Date.now() / 1000)),
        catchError((error) => {
          console.log(error)
          return of(false)
        })
      );
  }

  public getCurrentUserAttributes(): Observable<FetchUserAttributesOutput> {
    return from(fetchUserAttributes())
      .pipe(catchError((error) => {
        console.error('Erro no cadastro:', error);
        throw error;
      }));
  }
}

export interface UserSignUp {
  readonly name: string,
  readonly email: string,
  readonly password: string
}

export interface UserSignIn {
  email: string,
  password: string
}
