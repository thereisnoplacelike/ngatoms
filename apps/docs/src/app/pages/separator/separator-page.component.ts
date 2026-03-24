import { Component } from '@angular/core';
import { NgAtomsSeparatorDirective } from '../../../components/separator';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-separator-page',
  standalone: true,
  imports: [NgAtomsSeparatorDirective, ComponentDemoComponent],
  templateUrl: './separator-page.component.html',
  styleUrl: './separator-page.component.css',
})
export class SeparatorPageComponent {
  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<!-- Horizontal separator (default) -->
<p>Section A</p>
<div ngAtomsSeparator></div>
<p>Section B</p>

<!-- Vertical separator -->
<div style="display: flex; align-items: center; gap: 0.5rem;">
  <span>Home</span>
  <div ngAtomsSeparator [orientation]="'vertical'"></div>
  <span>Components</span>
  <div ngAtomsSeparator [orientation]="'vertical'"></div>
  <span>Separator</span>
</div>`,
    },
  ];
}
