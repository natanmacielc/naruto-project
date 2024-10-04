import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {filter} from "rxjs";
import {CropperDialogResult, PictureDialogComponent} from "../picture-dialog/picture-dialog.component";

@Component({
  selector: 'app-picture-container',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './picture-container.component.html',
  styleUrl: './picture-container.component.scss'
})
export class PictureContainerComponent implements OnInit {
  @Output() uploadImage: EventEmitter<Blob> = new EventEmitter<Blob>();
  @Input() defaultImage: string = 'assets/images/account.png';
  private readonly _pictureDialog: MatDialog = inject(MatDialog);
  actualImage: string = this.defaultImage;
  menuOpen: boolean = false;

  ngOnInit() {
    this.actualImage = this.defaultImage;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  imageFetchError() {
    this.actualImage = this.defaultImage;
  }

  fileSelected(event: any) {
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
          this.uploadTrigger(result.blob);
        });
    }
  }

  uploadTrigger(blob: Blob): void {
    this.actualImage = URL.createObjectURL(blob);
    this.uploadImage.emit(blob);
  }

  removeProfilePicture() {
    this.actualImage = this.defaultImage;
  }
}
