import { Component } from '@angular/core';
import { NgAtomsBadgeDirective } from '../../../components/badge';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const VARIANTS = ['default', 'secondary', 'outline', 'destructive', 'success'] as const;

@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [NgAtomsBadgeDirective, ComponentDemoComponent],
  templateUrl: './badge-page.component.html',
  styleUrl: './badge-page.component.css',
})
export class BadgePageComponent {
  readonly variants = VARIANTS;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<span ngAtomsBadge variant="default">Default</span>
<span ngAtomsBadge variant="secondary">Secondary</span>
<span ngAtomsBadge variant="outline">Outline</span>
<span ngAtomsBadge variant="destructive">Destructive</span>
<span ngAtomsBadge variant="success">Success</span>`,
    },
  ];
}
