import {inject, Injectable} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class NikaLoaderService {
  private readonly _spinner: NgxSpinnerService = inject(NgxSpinnerService);

  constructor() { }

  show(): void {
    this._spinner.show(undefined, {
      type: 'ball-scale-ripple',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#fff',
      size: 'default',
    });
  }

  hide(): void {
    this._spinner.hide();
  }
}
