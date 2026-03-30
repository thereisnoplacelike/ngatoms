import { Directive, inject } from '@angular/core';
import { NgAtomsPopoverComponent } from './popover.component';

@Directive({
  selector: '[ngAtomsPopoverTrigger]',
  standalone: true,
  host: {
    '(click)': 'popover.toggle()',
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'popover.open()',
  },
})
export class NgAtomsPopoverTriggerDirective {
  readonly popover = inject(NgAtomsPopoverComponent);
}