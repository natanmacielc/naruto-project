import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ThemeToggleService} from "../../service/theme-toggle/theme-toggle.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {CognitoService} from "../../service/cognito/cognito.service";
import {SimpleStorageService} from "../../service/simple-storage/simple-storage.service";
import {catchError, first, map, Observable, switchMap, tap} from "rxjs";
import {FetchUserAttributesOutput} from "@aws-amplify/auth";
import {UserDetails} from "../../user/details/user-details.component";
import {GetUrlWithPathOutput} from "aws-amplify/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent implements OnInit {
  private readonly _themeToggle: ThemeToggleService = inject(ThemeToggleService);
  private readonly _cognito: CognitoService = inject<CognitoService>(CognitoService);
  private readonly _simpleStorage: SimpleStorageService = inject<SimpleStorageService>(SimpleStorageService);
  private readonly _router: Router = inject<Router>(Router);
  private processing: boolean = true;
  readonly addPhotoImage: string = 'assets/images/add-photo.jpg';
  @ViewChild('profilepicture', {static: false}) profilePic!: ElementRef<HTMLImageElement>;
  profilePicture: string = 'assets/images/full-black.jpg';

  constructor() {
  }

  ngOnInit(): void {
    this._cognito.getCurrentUserAttributes()
      .pipe(
        switchMap((userInfo: FetchUserAttributesOutput) => this.getImageUrl(userInfo)),
        tap(() => this.processing = false),
        first()
      )
      .subscribe({
        next: (imageUrl: string): string => this.profilePicture = imageUrl,
        error: () => this.processing = false
      });
  }

  private getImageUrl(userInfo: FetchUserAttributesOutput): Observable<string> {
    return this._simpleStorage.getUrl(userInfo.email!.concat('.jpg'))
      .pipe(
        first(),
        map((result: GetUrlWithPathOutput) => result.url.toString())
      )
  }

  toggleDarkMode() {
    this._themeToggle.toggleTheme();
  }

  imageFetchError(): void {
    if (!this.processing) {
      this.profilePicture = this.addPhotoImage;
    }
  }

  navigate(route: string[]): void {
    this._router.navigate(route);
  }
}
