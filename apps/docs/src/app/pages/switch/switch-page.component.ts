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
      name: 'states.html',
      language: 'html',
      code: `<!-- Off -->
<label>
  <input ngAtomsSwitch [(checked)]="isEnabled" />
  <span>Off</span>
</label>

<!-- On -->
<label>
  <input ngAtomsSwitch [checked]="true" />
  <span>On</span>
</label>

<!-- Disabled off -->
<label>
  <input ngAtomsSwitch [checked]="false" disabled />
  <span>Off</span>
</label>

<!-- Disabled on -->
<label>
  <input ngAtomsSwitch [checked]="true" disabled />
  <span>On</span>
</label>`,
    },
    {
      name: 'sizes.html',
      language: 'html',
      code: `<input ngAtomsSwitch size="sm" [checked]="true" />
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
