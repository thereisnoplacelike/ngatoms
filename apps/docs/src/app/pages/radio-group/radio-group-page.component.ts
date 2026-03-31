import { Component, signal } from '@angular/core';
import { NgAtomsRadioGroupComponent, NgAtomsRadioDirective } from '../../../components/radio-group';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-radio-group-page',
  standalone: true,
  imports: [NgAtomsRadioGroupComponent, NgAtomsRadioDirective, ComponentDemoComponent],
  templateUrl: './radio-group-page.component.html',
  styleUrl: './radio-group-page.component.css',
})
export class RadioGroupPageComponent {
  readonly plan    = signal('pro');
  readonly payment = signal('card');
  readonly sizeSm  = signal('a');
  readonly sizeMd  = signal('a');
  readonly sizeLg  = signal('a');

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<nga-radio-group [(value)]="plan">
  <label class="radio-item">
    <input ngAtomsRadio value="free" />
    <span>Free</span>
  </label>
  <label class="radio-item">
    <input ngAtomsRadio value="pro" />
    <span>Pro</span>
  </label>
  <label class="radio-item">
    <input ngAtomsRadio value="enterprise" />
    <span>Enterprise</span>
  </label>
</nga-radio-group>`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import { signal } from '@angular/core';
import { NgAtomsRadioGroupComponent, NgAtomsRadioDirective } from './radio-group';

plan = signal('pro');`,
    },
  ];
}
