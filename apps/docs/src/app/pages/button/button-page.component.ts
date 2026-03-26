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
      name: 'variants-sizes.html',
      language: 'html',
      code: `<!-- Variants -->
<button ngAtomsButton variant="primary">Primary</button>
<button ngAtomsButton variant="outline">Outline</button>
<button ngAtomsButton variant="ghost">Ghost</button>
<button ngAtomsButton variant="secondary">Secondary</button>
<button ngAtomsButton variant="destructive">Destructive</button>

<!-- Sizes -->
<button ngAtomsButton size="xs">Extra small</button>
<button ngAtomsButton size="sm">Small</button>
<button ngAtomsButton size="md">Medium</button>
<button ngAtomsButton size="lg">Large</button>
<button ngAtomsButton size="xl">Extra large</button>`,
    },
    {
      name: 'states.html',
      language: 'html',
      code: `<!-- Loading -->
<button ngAtomsButton variant="primary" [loading]="true">Loading</button>
<button ngAtomsButton variant="outline" [loading]="true">Loading</button>

<!-- Disabled -->
<button ngAtomsButton variant="primary" disabled>Disabled</button>
<button ngAtomsButton variant="outline" disabled>Disabled</button>`,
    },
    {
      name: 'with-icons.html',
      language: 'html',
      code: `<button ngAtomsButton variant="primary">
  <i class="ph-bold ph-arrow-right"></i>
  Continue
</button>

<button ngAtomsButton variant="outline">
  <i class="ph-bold ph-download"></i>
  Download
</button>

<button ngAtomsButton variant="destructive">
  <i class="ph-bold ph-trash"></i>
  Delete
</button>`,
    },
  ];
}
