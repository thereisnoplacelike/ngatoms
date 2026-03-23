import { Component, signal, effect, inject, DOCUMENT } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <span class="brand-name">NgAtoms</span>
          <span class="brand-badge">alpha</span>
        </div>
        <nav class="sidebar-nav">
          <span class="nav-section">Components</span>
          <a routerLink="/badge" routerLinkActive="active">Badge</a>
          <a routerLink="/button" routerLinkActive="active">Button</a>
          <a routerLink="/input" routerLinkActive="active">Input</a>
        </nav>
        <div class="sidebar-footer">
          <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
            @if (isDark()) {
              <i class="ph-bold ph-sun"></i>
              <span>Light mode</span>
            } @else {
              <i class="ph-bold ph-moon"></i>
              <span>Dark mode</span>
            }
          </button>
        </div>
      </aside>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);

  readonly isDark = signal(true);

  constructor() {
    effect(() => {
      this.document.documentElement.classList.toggle('dark', this.isDark());
    });
  }

  toggleTheme(): void {
    this.isDark.update(v => !v);
  }
}
