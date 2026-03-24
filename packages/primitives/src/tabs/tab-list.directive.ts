import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsTabList]',
  standalone: true,
  host: {
    class: 'nga-tab-list',
    role: 'tablist',
  },
})
export class NgAtomsTabListDirective {}
