import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsDialogTitle]',
  standalone: true,
  host: { class: 'nga-dialog-title' },
})
export class NgAtomsDialogTitleDirective {}
