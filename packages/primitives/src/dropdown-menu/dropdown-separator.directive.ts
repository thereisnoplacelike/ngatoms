import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsDropdownSeparator]',
  standalone: true,
  host: {
    class: 'nga-dropdown-separator',
    role: 'separator',
    'aria-orientation': 'horizontal',
  },
})
export class NgAtomsDropdownSeparatorDirective {}
