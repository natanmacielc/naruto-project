import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ThemeToggleService} from "../../service/theme-toggle/theme-toggle.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly themeToggle: ThemeToggleService = inject(ThemeToggleService);

  constructor() {
  }

  toggleDarkMode() {
    this.themeToggle.toggleTheme();
  }
}
