import { Component } from '@angular/core';
import {
  NgAtomsDropdownMenuComponent,
  NgAtomsDropdownTriggerDirective,
  NgAtomsDropdownItemDirective,
  NgAtomsDropdownSeparatorDirective,
  NgAtomsDropdownLabelDirective,
} from '../../../components/dropdown-menu';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-dropdown-menu-page',
  standalone: true,
  imports: [
    NgAtomsDropdownMenuComponent,
    NgAtomsDropdownTriggerDirective,
    NgAtomsDropdownItemDirective,
    NgAtomsDropdownSeparatorDirective,
    NgAtomsDropdownLabelDirective,
    ComponentDemoComponent,
  ],
  templateUrl: './dropdown-menu-page.component.html',
  styleUrl: './dropdown-menu-page.component.css',
})
export class DropdownMenuPageComponent {
  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<nga-dropdown-menu>
  <button ngAtomsDropdownTrigger>
    Options
    <i class="ph-bold ph-caret-down nga-dropdown-caret"></i>
  </button>
  <span ngAtomsDropdownLabel>Actions</span>
  <button ngAtomsDropdownItem>
    <i class="ph-bold ph-pencil-simple"></i>
    Edit
  </button>
  <button ngAtomsDropdownItem>
    <i class="ph-bold ph-copy"></i>
    Duplicate
  </button>
  <div ngAtomsDropdownSeparator></div>
  <button ngAtomsDropdownItem [destructive]="true">
    <i class="ph-bold ph-trash"></i>
    Delete
  </button>
</nga-dropdown-menu>`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import {
  NgAtomsDropdownMenuComponent,
  NgAtomsDropdownTriggerDirective,
  NgAtomsDropdownItemDirective,
  NgAtomsDropdownSeparatorDirective,
  NgAtomsDropdownLabelDirective,
} from './dropdown-menu';

@Component({
  imports: [
    NgAtomsDropdownMenuComponent,
    NgAtomsDropdownTriggerDirective,
    NgAtomsDropdownItemDirective,
    NgAtomsDropdownSeparatorDirective,
    NgAtomsDropdownLabelDirective,
  ],
})
export class ExampleComponent {}`,
    },
  ];
}
