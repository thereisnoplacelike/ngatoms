import { Component } from '@angular/core';
import { NgAtomsButtonDirective } from '../../../../../../packages/primitives/src/button';

const VARIANTS = ['primary', 'outline', 'ghost', 'secondary', 'destructive'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

type Variant = typeof VARIANTS[number];
type Size = typeof SIZES[number];

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [NgAtomsButtonDirective],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.css',
})
export class ButtonPageComponent {
  readonly variants = VARIANTS;
  readonly sizes = SIZES;
}
