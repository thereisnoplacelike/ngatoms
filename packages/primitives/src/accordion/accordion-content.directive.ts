import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsAccordionContent]',
  standalone: true,
  host: { class: 'nga-accordion-content' },
})
export class NgAtomsAccordionContentDirective {}
