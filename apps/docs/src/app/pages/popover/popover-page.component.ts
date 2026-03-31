import { Component, signal } from '@angular/core';
import { NgAtomsPopoverComponent, NgAtomsPopoverTriggerDirective } from '../../../components/popover';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-popover-page',
  standalone: true,
  imports: [NgAtomsPopoverComponent, NgAtomsPopoverTriggerDirective, ComponentDemoComponent],
  templateUrl: './popover-page.component.html',
  styleUrl: './popover-page.component.css',
})
export class PopoverPageComponent {
  readonly open = signal(false);
  readonly openTop = signal(false);
  readonly openBottom = signal(false);
  readonly openLeft = signal(false);
  readonly openRight = signal(false);

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<nga-popover [(open)]="open" placement="bottom">
  <button ngAtomsPopoverTrigger>Open popover</button>
  <p>Popover content goes here.</p>
</nga-popover>`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import { NgAtomsPopoverComponent, NgAtomsPopoverTriggerDirective } from './popover';

@Component({
  imports: [NgAtomsPopoverComponent, NgAtomsPopoverTriggerDirective],
})
export class ExampleComponent {
  open = signal(false);
}`,
    },
  ];
}
