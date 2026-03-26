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
          <img class="brand-logo" [src]="isDark() ? 'assets/ngatoms-logo-w.svg' : 'assets/ngatoms-logo-b.svg'" alt="" aria-hidden="true" />
          <span class="brand-name">NgAtoms</span>
          <span class="brand-badge">alpha</span>
        </div>
        <nav class="sidebar-nav">
          <span class="nav-section">Overview</span>
          <a routerLink="/get-started" routerLinkActive="active">Get Started</a>

          <span class="nav-section">Forms</span>
          <a routerLink="/button" routerLinkActive="active">Button</a>
          <a routerLink="/checkbox" routerLinkActive="active">Checkbox</a>
          <a routerLink="/input" routerLinkActive="active">Input</a>
          <a routerLink="/select" routerLinkActive="active">Select</a>
          <a routerLink="/switch" routerLinkActive="active">Switch</a>
          <a routerLink="/textarea" routerLinkActive="active">Textarea</a>

          <span class="nav-section">Layout</span>
          <a routerLink="/card" routerLinkActive="active">Card</a>
          <a routerLink="/separator" routerLinkActive="active">Separator</a>

          <span class="nav-section">Display</span>
          <a routerLink="/avatar" routerLinkActive="active">Avatar</a>

          <span class="nav-section">Feedback</span>
          <a routerLink="/alert" routerLinkActive="active">Alert</a>
          <a routerLink="/badge" routerLinkActive="active">Badge</a>
          <a routerLink="/progress" routerLinkActive="active">Progress</a>
          <a routerLink="/spinner" routerLinkActive="active">Spinner</a>
          <a routerLink="/tooltip" routerLinkActive="active">Tooltip</a>

          <span class="nav-section">Navigation</span>
          <a routerLink="/accordion" routerLinkActive="active">Accordion</a>
          <a routerLink="/tabs" routerLinkActive="active">Tabs</a>

          <span class="nav-section">Overlays</span>
          <a routerLink="/dialog" routerLinkActive="active">Dialog</a>
        </nav>
        <div class="sidebar-footer">
          <a class="bmc-btn" href="https://www.buymeacoffee.com/lazarodutrae" target="_blank" rel="noopener noreferrer">
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=lazarodutrae&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy me a coffee" />
          </a>
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
