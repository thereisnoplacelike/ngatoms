import { Component } from '@angular/core';
import { NgAtomsSpinnerDirective } from '../../../components/spinner';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const SIZES = ['sm', 'md', 'lg'] as const;

@Component({
  selector: 'app-spinner-page',
  standalone: true,
  imports: [NgAtomsSpinnerDirective, ComponentDemoComponent],
  templateUrl: './spinner-page.component.html',
  styleUrl: './spinner-page.component.css',
})
export class SpinnerPageComponent {
  readonly sizes = SIZES;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'sizes.html',
      language: 'html',
      code: `<span ngAtomsSpinner size="sm"></span>
<span ngAtomsSpinner size="md"></span>
<span ngAtomsSpinner size="lg"></span>`,
    },
    {
      name: 'colors.html',
      language: 'html',
      code: `<!-- Inherits the current CSS color -->
<span ngAtomsSpinner style="color: var(--nga-color-primary)"></span>
<span ngAtomsSpinner style="color: var(--nga-color-destructive)"></span>
<span ngAtomsSpinner style="color: var(--nga-color-success)"></span>`,
    },
  ];
}
