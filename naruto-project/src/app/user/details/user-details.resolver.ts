import {ResolveFn} from '@angular/router';
import {UserDetails} from "./user-details.component";
import {CognitoService} from "../../service/cognito/cognito.service";
import {inject} from "@angular/core";
import {FetchUserAttributesOutput} from "@aws-amplify/auth";
import {first, map, Observable, of, switchMap, tap} from "rxjs";
import {SimpleStorageService} from "../../service/simple-storage/simple-storage.service";
import {GetUrlWithPathOutput} from "aws-amplify/storage";

export const userDetailsResolver: ResolveFn<UserDetails> = (route, state) => {
  const cognito: CognitoService = inject<CognitoService>(CognitoService);
  const simpleStorage: SimpleStorageService = inject<SimpleStorageService>(SimpleStorageService);
  return cognito.getCurrentUserAttributes()
    .pipe(
      map((userInfo: FetchUserAttributesOutput) => toUserDetails(userInfo)),
      switchMap((userDetails: UserDetails) => profilePictureAppend(userDetails, simpleStorage)),
      first()
    );
};

function toUserDetails(userInfo: FetchUserAttributesOutput): UserDetails {
  return {name: userInfo.name, email: userInfo.email, profilePicture: '', recordAmount: ''} as UserDetails
}

function profilePictureAppend(userDetails: UserDetails, simpleStorage: SimpleStorageService): Observable<UserDetails> {
  return simpleStorage.getUrl(userDetails.email.concat('.jpg'))
    .pipe(
      first(),
      map((result: GetUrlWithPathOutput) => {
        userDetails.profilePicture = result.url.toString()
        return userDetails;
      })
    )
}
