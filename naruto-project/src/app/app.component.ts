import {AfterViewChecked, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {ThemeToggleService} from "./service/theme-toggle/theme-toggle.service";
import {NikaLoaderComponent} from "./shared/nika-loader/nika-loader.component";
import {NikaLoaderService} from "./shared/nika-loader/nika-loader.service";
import {OpFormComponent} from "./shared/op-form/op-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, NikaLoaderComponent, OpFormComponent],
  providers: [Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewChecked {
  private readonly _router: Router = inject(Router);
  private readonly _themeToggle: ThemeToggleService = inject<ThemeToggleService>(ThemeToggleService);
  private readonly _cdr: ChangeDetectorRef = inject<ChangeDetectorRef>(ChangeDetectorRef);
  private readonly _loader: NikaLoaderService = inject<NikaLoaderService>(NikaLoaderService);
  title: string = 'naruto-project';

  ngOnInit(): void {
    this.applyThemeChanges();
    this._router.navigate(['signin']);
  }

  applyThemeChanges(): void {
    this._themeToggle.detectSystemTheme();
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._loader.show();
      }
      if (event instanceof NavigationEnd) {
        this._themeToggle.applyCurrentTheme();
        this._loader.hide();
      }
    });
  }

  ngAfterViewChecked(): void {
    this._themeToggle.applyCurrentTheme();
    this._cdr.detectChanges();
  }
}
