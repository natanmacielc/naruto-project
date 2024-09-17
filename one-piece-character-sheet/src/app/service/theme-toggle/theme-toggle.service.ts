import {Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private readonly _rendererFactory: RendererFactory2 = inject(RendererFactory2);
  private readonly _renderer: Renderer2 = this._rendererFactory.createRenderer(null, null);
  isDarkMode: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyCurrentTheme();
  }

  detectSystemTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  applyCurrentTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const elements = document.querySelectorAll('*');
      elements.forEach((element) => {
        if (this.isDarkMode) {
          this._renderer.addClass(element, 'dark-mode');
        } else {
          this._renderer.removeClass(element, 'dark-mode');
        }
      });
    }
  }
}
