import {Component, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ImageCroppedEvent, ImageCropperComponent} from "ngx-image-cropper";
import {ThemeToggleService} from "../../service/theme-toggle/theme-toggle.service";

export type CropperDialogData = {
  image: File;
  width: number;
  height: number;
};

export type CropperDialogResult = {
  blob: Blob;
  imageUrl: string;
};

@Component({
  selector: 'app-picture-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogTitle,
    NgIf,
    NgOptimizedImage,
    NgStyle,
    MatProgressSpinner,
    ImageCropperComponent
  ],
  templateUrl: './picture-dialog.component.html',
  styleUrl: './picture-dialog.component.scss'
})
export class PictureDialogComponent {
  data: CropperDialogData = inject(MAT_DIALOG_DATA);
  themeToggle: ThemeToggleService = inject(ThemeToggleService);

  result = signal<CropperDialogResult | undefined>(undefined);

  imageCropped(event: ImageCroppedEvent) {
    const { blob, objectUrl } = event;
    if (blob && objectUrl) {
      this.result.set({ blob, imageUrl: objectUrl });
    }
  }
}
