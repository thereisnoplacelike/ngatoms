import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'badge', pathMatch: 'full' },
  {
    path: 'badge',
    loadComponent: () =>
      import('./pages/badge/badge-page.component').then(m => m.BadgePageComponent),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button/button-page.component').then(m => m.ButtonPageComponent),
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./pages/input/input-page.component').then(m => m.InputPageComponent),
  },
];
