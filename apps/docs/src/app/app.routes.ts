import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'alert', pathMatch: 'full' },
  {
    path: 'alert',
    loadComponent: () =>
      import('./pages/alert/alert-page.component').then(m => m.AlertPageComponent),
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./pages/checkbox/checkbox-page.component').then(m => m.CheckboxPageComponent),
  },
  {
    path: 'textarea',
    loadComponent: () =>
      import('./pages/textarea/textarea-page.component').then(m => m.TextareaPageComponent),
  },
  {
    path: 'separator',
    loadComponent: () =>
      import('./pages/separator/separator-page.component').then(m => m.SeparatorPageComponent),
  },
  {
    path: 'card',
    loadComponent: () =>
      import('./pages/card/card-page.component').then(m => m.CardPageComponent),
  },
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
  {
    path: 'tooltip',
    loadComponent: () =>
      import('./pages/tooltip/tooltip-page.component').then(m => m.TooltipPageComponent),
  },
  {
    path: 'dialog',
    loadComponent: () =>
      import('./pages/dialog/dialog-page.component').then(m => m.DialogPageComponent),
  },
  {
    path: 'accordion',
    loadComponent: () =>
      import('./pages/accordion/accordion-page.component').then(m => m.AccordionPageComponent),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs-page.component').then(m => m.TabsPageComponent),
  },
  {
    path: 'select',
    loadComponent: () =>
      import('./pages/select/select-page.component').then(m => m.SelectPageComponent),
  },
  {
    path: 'switch',
    loadComponent: () =>
      import('./pages/switch/switch-page.component').then(m => m.SwitchPageComponent),
  },
];
