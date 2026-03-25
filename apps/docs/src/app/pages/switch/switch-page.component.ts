import { Component, signal } from '@angular/core';
import { NgAtomsSwitchDirective } from '../../../components/switch';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-switch-page',
  standalone: true,
  imports: [NgAtomsSwitchDirective, ComponentDemoComponent],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.css',
})
export class SwitchPageComponent {
  readonly stateOff = signal(false);
  readonly stateOn = signal(true);
  readonly notifications = signal(true);
  readonly autoSave = signal(true);
  readonly analytics = signal(false);

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<label>
  <input ngAtomsSwitch [(checked)]="isEnabled" />
  <span>Enable feature</span>
</label>

<!-- Disabled -->
<label>
  <input ngAtomsSwitch [checked]="true" disabled />
  <span>Always on</span>
</label>

<!-- Sizes -->
<input ngAtomsSwitch size="sm" [checked]="true" />
<input ngAtomsSwitch size="md" [checked]="true" />
<input ngAtomsSwitch size="lg" [checked]="true" />`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { NgAtomsSwitchDirective } from './components/switch';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NgAtomsSwitchDirective],
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  readonly isEnabled = signal(false);
}`,
    },
  ];
}
