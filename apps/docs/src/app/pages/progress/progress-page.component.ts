import { Component } from '@angular/core';
import { NgAtomsProgressComponent } from '../../../components/progress';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const VARIANTS = ['default', 'accent', 'success', 'destructive'] as const;

@Component({
  selector: 'app-progress-page',
  standalone: true,
  imports: [NgAtomsProgressComponent, ComponentDemoComponent],
  templateUrl: './progress-page.component.html',
  styleUrl: './progress-page.component.css',
})
export class ProgressPageComponent {
  readonly variants = VARIANTS;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'variants.html',
      language: 'html',
      code: `<nga-progress variant="default" [value]="65"></nga-progress>
<nga-progress variant="accent" [value]="65"></nga-progress>
<nga-progress variant="success" [value]="65"></nga-progress>
<nga-progress variant="destructive" [value]="65"></nga-progress>`,
    },
    {
      name: 'sizes.html',
      language: 'html',
      code: `<nga-progress variant="accent" [value]="60" size="sm"></nga-progress>
<nga-progress variant="accent" [value]="60" size="md"></nga-progress>
<nga-progress variant="accent" [value]="60" size="lg"></nga-progress>`,
    },
    {
      name: 'indeterminate.html',
      language: 'html',
      code: `<nga-progress variant="default" [indeterminate]="true"></nga-progress>
<nga-progress variant="accent" [indeterminate]="true"></nga-progress>
<nga-progress variant="success" [indeterminate]="true"></nga-progress>
<nga-progress variant="destructive" [indeterminate]="true"></nga-progress>`,
    },
  ];
}
