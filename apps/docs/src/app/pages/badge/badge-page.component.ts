import { Component } from '@angular/core';
import { NgAtomsBadgeDirective } from '../../../components/badge';

const VARIANTS = ['default', 'secondary', 'outline', 'destructive', 'success'] as const;

@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [NgAtomsBadgeDirective],
  templateUrl: './badge-page.component.html',
  styleUrl: './badge-page.component.css',
})
export class BadgePageComponent {
  readonly variants = VARIANTS;
}
