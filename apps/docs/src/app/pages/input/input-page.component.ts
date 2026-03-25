import { Component } from '@angular/core';
import { NgAtomsInputDirective } from '../../../components/input';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const VARIANTS = ['default', 'filled', 'ghost'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [NgAtomsInputDirective, ComponentDemoComponent],
  templateUrl: './input-page.component.html',
  styleUrl: './input-page.component.css',
})
export class InputPageComponent {
  readonly variants = VARIANTS;
  readonly sizes = SIZES;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<!-- Default variant -->
<input ngAtomsInput placeholder="Default input" />

<!-- Filled variant -->
<input ngAtomsInput variant="filled" placeholder="Filled input" />

<!-- Ghost variant -->
<input ngAtomsInput variant="ghost" placeholder="Ghost input" />

<!-- Invalid state -->
<input ngAtomsInput [invalid]="true" placeholder="Invalid input" />

<!-- Disabled -->
<input ngAtomsInput placeholder="Disabled input" disabled />`,
    },
  ];
}
