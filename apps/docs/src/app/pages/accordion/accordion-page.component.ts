import { Component } from '@angular/core';
import { NgAtomsAccordionComponent } from '../../../components/accordion/accordion.component';
import { NgAtomsAccordionItemComponent } from '../../../components/accordion/accordion-item.component';
import { NgAtomsAccordionTriggerDirective } from '../../../components/accordion/accordion-trigger.directive';
import { NgAtomsAccordionContentDirective } from '../../../components/accordion/accordion-content.directive';

@Component({
  selector: 'app-accordion-page',
  standalone: true,
  imports: [
    NgAtomsAccordionComponent,
    NgAtomsAccordionItemComponent,
    NgAtomsAccordionTriggerDirective,
    NgAtomsAccordionContentDirective,
  ],
  templateUrl: './accordion-page.component.html',
  styleUrl: './accordion-page.component.css',
})
export class AccordionPageComponent {}
