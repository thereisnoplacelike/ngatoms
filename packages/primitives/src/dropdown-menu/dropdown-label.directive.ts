import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsDropdownLabel]',
  standalone: true,
  host: { class: 'nga-dropdown-label' },
})
export class NgAtomsDropdownLabelDirective {}
