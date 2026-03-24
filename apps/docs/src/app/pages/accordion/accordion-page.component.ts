import { Component } from '@angular/core';
import { NgAtomsAccordionComponent } from '../../../components/accordion/accordion.component';
import { NgAtomsAccordionItemComponent } from '../../../components/accordion/accordion-item.component';
import { NgAtomsAccordionTriggerDirective } from '../../../components/accordion/accordion-trigger.directive';
import { NgAtomsAccordionContentDirective } from '../../../components/accordion/accordion-content.directive';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-accordion-page',
  standalone: true,
  imports: [
    NgAtomsAccordionComponent,
    NgAtomsAccordionItemComponent,
    NgAtomsAccordionTriggerDirective,
    NgAtomsAccordionContentDirective,
    ComponentDemoComponent,
  ],
  templateUrl: './accordion-page.component.html',
  styleUrl: './accordion-page.component.css',
})
export class AccordionPageComponent {
  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<nga-accordion defaultValue="item-1">
  <nga-accordion-item value="item-1">
    <button ngAtomsAccordionTrigger>What is NgAtoms?</button>
    <div ngAtomsAccordionContent>
      NgAtoms is a collection of Angular UI primitives designed to be
      copied directly into your project. No runtime dependencies.
    </div>
  </nga-accordion-item>
  <nga-accordion-item value="item-2">
    <button ngAtomsAccordionTrigger>How does it work?</button>
    <div ngAtomsAccordionContent>
      Run ngatoms add accordion and the files are copied into your codebase.
    </div>
  </nga-accordion-item>
  <nga-accordion-item value="item-3">
    <button ngAtomsAccordionTrigger>Can I customise styles?</button>
    <div ngAtomsAccordionContent>
      Yes. All styles are plain CSS custom properties you can override.
    </div>
  </nga-accordion-item>
</nga-accordion>`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import { Component } from '@angular/core';
import {
  NgAtomsAccordionComponent,
  NgAtomsAccordionItemComponent,
  NgAtomsAccordionTriggerDirective,
  NgAtomsAccordionContentDirective,
} from './components/accordion';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    NgAtomsAccordionComponent,
    NgAtomsAccordionItemComponent,
    NgAtomsAccordionTriggerDirective,
    NgAtomsAccordionContentDirective,
  ],
  templateUrl: './example.component.html',
})
export class ExampleComponent {}`,
    },
  ];
}
