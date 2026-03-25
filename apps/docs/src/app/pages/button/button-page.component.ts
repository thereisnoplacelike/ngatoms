import { Component } from '@angular/core';
import { NgAtomsButtonDirective } from '../../../components/button';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const VARIANTS = ['primary', 'outline', 'ghost', 'secondary', 'destructive'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [NgAtomsButtonDirective, ComponentDemoComponent],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.css',
})
export class ButtonPageComponent {
  readonly variants = VARIANTS;
  readonly sizes = SIZES;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<button ngAtomsButton variant="primary">Primary</button>
<button ngAtomsButton variant="outline">Outline</button>
<button ngAtomsButton variant="ghost">Ghost</button>
<button ngAtomsButton variant="secondary">Secondary</button>
<button ngAtomsButton variant="destructive">Destructive</button>

<!-- Sizes -->
<button ngAtomsButton size="sm">Small</button>
<button ngAtomsButton size="md">Medium</button>
<button ngAtomsButton size="lg">Large</button>

<!-- Loading state -->
<button ngAtomsButton [loading]="true">Loading</button>`,
    },
  ];
}
