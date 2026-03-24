import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsDialogBody]',
  standalone: true,
  host: { class: 'nga-dialog-body' },
})
export class NgAtomsDialogBodyDirective {}
