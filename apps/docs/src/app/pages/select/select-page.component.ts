import { Component, signal } from '@angular/core';
import { NgAtomsSelectComponent, NgAtomsSelectOption } from '../../../components/select';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [NgAtomsSelectComponent, ComponentDemoComponent],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.css',
})
export class SelectPageComponent {
  readonly department = signal<string | null>(null);
  readonly role = signal<string | null>(null);
  readonly skills = signal<string[]>([]);
  readonly invalidValue = signal<string | null>(null);

  readonly departments: NgAtomsSelectOption[] = [
    { value: 'eng', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'legal', label: 'Legal' },
  ];

  readonly roles: NgAtomsSelectOption[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'guest', label: 'Guest', disabled: true },
  ];

  readonly countries: NgAtomsSelectOption[] = [
    { value: 'br', label: 'Brazil' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
    { value: 'pt', label: 'Portugal' },
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'mx', label: 'Mexico' },
  ];

  readonly skillOptions: NgAtomsSelectOption[] = [
    { value: 'ts', label: 'TypeScript' },
    { value: 'ng', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'rust', label: 'Rust' },
    { value: 'go', label: 'Go' },
  ];

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<!-- Basic select -->
<nga-select [options]="options" placeholder="Choose an option" />

<!-- With two-way binding -->
<nga-select [options]="options" [(value)]="selected" placeholder="Choose an option" />

<!-- Searchable -->
<nga-select [options]="options" [searchable]="true" placeholder="Search options..." />

<!-- Multiple selection -->
<nga-select [options]="options" [multiple]="true" [(value)]="selectedMany" placeholder="Select multiple..." />

<!-- Variants -->
<nga-select [options]="options" variant="filled" placeholder="Filled" />
<nga-select [options]="options" variant="ghost" placeholder="Ghost" />

<!-- Invalid state -->
<nga-select [options]="options" [invalid]="true" placeholder="Select role" />`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { NgAtomsSelectComponent, NgAtomsSelectOption } from './components/select';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NgAtomsSelectComponent],
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  readonly selected = signal<string | null>(null);
  readonly selectedMany = signal<string[]>([]);

  readonly options: NgAtomsSelectOption[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'guest', label: 'Guest', disabled: true },
  ];
}`,
    },
  ];
}
