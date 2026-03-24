import { Component } from '@angular/core';
import { NgAtomsInputDirective } from '../../../components/input';

const VARIANTS = ['default', 'filled', 'ghost'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [NgAtomsInputDirective],
  templateUrl: './input-page.component.html',
  styleUrl: './input-page.component.css',
})
export class InputPageComponent {
  readonly variants = VARIANTS;
  readonly sizes = SIZES;
}
