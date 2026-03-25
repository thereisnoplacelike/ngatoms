import { Component, signal } from '@angular/core';
import { NgAtomsCheckboxDirective } from '../../../components/checkbox';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [NgAtomsCheckboxDirective, ComponentDemoComponent],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.css',
})
export class CheckboxPageComponent {
  readonly checked = signal(true);
  readonly unchecked = signal(false);
  readonly indeterminate = signal(false);

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<label>
  <input ngAtomsCheckbox [(checked)]="isChecked" />
  <span>Accept terms and conditions</span>
</label>

<label>
  <input ngAtomsCheckbox [indeterminate]="true" />
  <span>Indeterminate state</span>
</label>

<label>
  <input ngAtomsCheckbox [checked]="true" disabled />
  <span>Disabled</span>
</label>`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { NgAtomsCheckboxDirective } from './components/checkbox';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NgAtomsCheckboxDirective],
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  readonly isChecked = signal(false);
}`,
    },
  ];
}
