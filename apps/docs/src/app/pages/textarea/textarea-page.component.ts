import { Component } from '@angular/core';
import { NgAtomsTextareaDirective } from '../../../components/textarea';

const VARIANTS = ['default', 'filled', 'ghost'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

@Component({
  selector: 'app-textarea-page',
  standalone: true,
  imports: [NgAtomsTextareaDirective],
  templateUrl: './textarea-page.component.html',
  styleUrl: './textarea-page.component.css',
})
export class TextareaPageComponent {
  readonly variants = VARIANTS;
  readonly sizes = SIZES;
}
