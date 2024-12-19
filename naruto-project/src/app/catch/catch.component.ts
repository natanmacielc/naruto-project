import {Component, ElementRef} from '@angular/core';
import {UserHeaderComponent} from "../shared/user-header/user-header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {OpContainerComponent} from "../shared/op-container/op-container.component";
import {ButtonComponent} from "../shared/button/button.component";
import {MatDialog} from "@angular/material/dialog";
import {CatchHistoryComponent} from "./catch-history/catch-history.component";

@Component({
  selector: 'app-catch',
  standalone: true,
  imports: [
    UserHeaderComponent,
    FooterComponent,
    OpContainerComponent,
    ButtonComponent
  ],
  templateUrl: './catch.component.html',
  styleUrl: './catch.component.scss'
})
export class CatchComponent {
  private readonly tailedBeastsY: Map<number, string> = new Map([[79, 'Shukaku'], [0, 'Matatabi'], [632, 'Isobu'], [553, 'Son Gokuu'], [474, 'Kokuo'], [395, 'Saiken'], [316, 'Choumei'], [237, 'Gyuuki'], [158, 'Kurama']]);
  iconHeight: number = 79;
  numIcons: number = 9;
  timePerIcon: number = 100;
  indexes: number[] = [0, 0, 0];

  constructor(private readonly elementRef: ElementRef, private readonly dialog: MatDialog) {
  }

  roll(reel: HTMLElement, offset: number = 0): Promise<number> {
    const delta = (offset + 2) * this.numIcons + Math.round(Math.random() * this.numIcons);
    return new Promise((resolve) => {
      const style = getComputedStyle(reel);
      const backgroundPositionY = parseFloat(style.backgroundPositionY || '0');
      const targetBackgroundPositionY = backgroundPositionY + delta * this.iconHeight;
      const normTargetBackgroundPositionY = targetBackgroundPositionY % (this.numIcons * this.iconHeight);
      console.log(this.tailedBeastsY.get(normTargetBackgroundPositionY));
      setTimeout(() => {
        reel.style.transition = `background-position-y ${(8 + delta) * this.timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * this.iconHeight}px`;
      }, offset * 150);

      setTimeout(() => {
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % this.numIcons);
      }, (8 + delta) * this.timePerIcon + offset * 150);
    });
  }

  rollAll(): void {
    const reel = this.elementRef.nativeElement.querySelector('.slots > .reel');
    this.roll(reel as HTMLElement)
      .then((delta) => {
        this.indexes[0] = (this.indexes[0] + delta) % this.numIcons;
        if (this.indexes[0] === this.indexes[1] || this.indexes[1] === this.indexes[2]) {
          const winCls = this.indexes[0] === this.indexes[2] ? 'win2' : 'win1';
          const slotsEl = this.elementRef.nativeElement.querySelector('.slots');
          slotsEl.classList.add(winCls);
          setTimeout(() => slotsEl.classList.remove(winCls), 2000);
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CatchHistoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
