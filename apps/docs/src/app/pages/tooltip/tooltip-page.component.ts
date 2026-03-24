import { Component } from '@angular/core';
import { NgAtomsTooltipDirective } from '../../../components/tooltip';
import { NgAtomsButtonDirective } from '../../../components/button';
import { NgAtomsBadgeDirective } from '../../../components/badge';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [
    NgAtomsTooltipDirective,
    NgAtomsButtonDirective,
    NgAtomsBadgeDirective,
    ComponentDemoComponent,
  ],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.css',
})
export class TooltipPageComponent {
  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<!-- Top placement (default) -->
<button ngAtomsButton [ngAtomsTooltip]="'Appears above'" placement="top">
  Top
</button>

<!-- Bottom placement -->
<button ngAtomsButton [ngAtomsTooltip]="'Appears below'" placement="bottom">
  Bottom
</button>

<!-- Left placement -->
<button ngAtomsButton [ngAtomsTooltip]="'Appears to the left'" placement="left">
  Left
</button>

<!-- Right placement -->
<button ngAtomsButton [ngAtomsTooltip]="'Appears to the right'" placement="right">
  Right
</button>`,
    },
  ];
}
