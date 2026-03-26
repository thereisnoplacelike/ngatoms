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
      name: 'example.component.html',
      language: 'html',
      code: `<nga-progress variant="accent" [value]="65"></nga-progress>
<nga-progress variant="success" [value]="80"></nga-progress>
<nga-progress variant="destructive" [value]="40"></nga-progress>

<!-- Indeterminate -->
<nga-progress variant="accent" [indeterminate]="true"></nga-progress>`,
    },
  ];
}
