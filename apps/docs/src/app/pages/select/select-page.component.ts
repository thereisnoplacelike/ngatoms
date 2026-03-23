import { Component, signal } from '@angular/core';
import { NgAtomsSelectComponent, NgAtomsSelectOption } from '../../../components/select';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [NgAtomsSelectComponent],
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
}
