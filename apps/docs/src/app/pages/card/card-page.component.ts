import { Component } from '@angular/core';
import {
  NgAtomsCardDirective,
  NgAtomsCardHeaderDirective,
  NgAtomsCardTitleDirective,
  NgAtomsCardDescriptionDirective,
  NgAtomsCardContentDirective,
  NgAtomsCardFooterDirective,
} from '../../../components/card';
import { NgAtomsBadgeDirective } from '../../../components/badge';
import { NgAtomsButtonDirective } from '../../../components/button';
import { NgAtomsSeparatorDirective } from '../../../components/separator';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [
    NgAtomsCardDirective,
    NgAtomsCardHeaderDirective,
    NgAtomsCardTitleDirective,
    NgAtomsCardDescriptionDirective,
    NgAtomsCardContentDirective,
    NgAtomsCardFooterDirective,
    NgAtomsBadgeDirective,
    NgAtomsButtonDirective,
    NgAtomsSeparatorDirective,
    ComponentDemoComponent,
  ],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.css',
})
export class CardPageComponent {
  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<div ngAtomsCard>
  <div ngAtomsCardHeader>
    <h3 ngAtomsCardTitle>Card title</h3>
    <p ngAtomsCardDescription>A short description of the card content.</p>
  </div>
  <div ngAtomsCardContent>
    <p>Main content area goes here.</p>
  </div>
  <div ngAtomsCardFooter>
    <button ngAtomsButton variant="outline" size="sm">Cancel</button>
    <button ngAtomsButton size="sm">Confirm</button>
  </div>
</div>`,
    },
  ];
}
