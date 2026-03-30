import { Component, signal, effect, inject, DOCUMENT } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
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
