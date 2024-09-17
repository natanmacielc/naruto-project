import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {HeaderComponent} from "../shared/header/header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CognitoService} from "../service/cognito/cognito.service";
import {filter, first} from "rxjs";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CropperDialogResult, PictureDialogComponent} from "./picture-dialog/picture-dialog.component";
import {MatButton} from "@angular/material/button";
import {SimpleStorageService} from "../service/simple-storage/simple-storage.service";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgOptimizedImage,
    NgIf,
    MatButton
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  private readonly _router: Router = inject(Router);
  private readonly _cognito: CognitoService = inject(CognitoService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _pictureDialog: MatDialog = inject(MatDialog);
  private readonly _simpleStorage: SimpleStorageService = inject(SimpleStorageService);
  readonly addPhotoImage: string = 'assets/images/add-photo.jpg';
  profilePicture: string = 'assets/images/add_photo.png';
  @ViewChild('profilepicture', { static: false }) profilePic!: ElementRef<HTMLImageElement>;
  userDetails!: UserDetails;
  menuOpen: boolean = false;

  constructor() {
    this._route.data.subscribe(data => {
      const resolvedData = data['resolvedData'];
      this.userDetails = resolvedData as UserDetails;
      this.profilePicture = this.userDetails.profilePicture;
      console.log(this.userDetails.profilePicture);
    })
  }

  signOut(): void {
    this._cognito.signOut()
      .pipe(first())
      .subscribe(() => this._router.navigate(['signin']));
  }

  fileSelected(event: any): void {
    this.toggleMenu();
    const file = event.target?.files[0];
    if (file) {
      const dialogRef: MatDialogRef<PictureDialogComponent> = this._pictureDialog.open(PictureDialogComponent, {
        data: {
          image: file,
          width: 250,
          height: 250,
        },
        width: '500px',
      });
      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result: CropperDialogResult) => {
          this.uploadImage(result.blob);
        });
    }
  }

  uploadImage(blob: Blob): void {
    this._simpleStorage.uploadFile({blob: blob, path: this.userDetails.email.concat('.jpg')})
    this.profilePicture = URL.createObjectURL(blob);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  removeProfilePicture(): void {
    this.toggleMenu();
    this._simpleStorage.removeFile(this.userDetails.email.concat('.jpg'));
    this.profilePicture = this.addPhotoImage;
  }

  imageFetchError(): void {
    this.profilePicture = this.addPhotoImage;
  }
}

export interface UserDetails {
  name: string;
  email: string,
  recordAmount: string,
  profilePicture: string
}
