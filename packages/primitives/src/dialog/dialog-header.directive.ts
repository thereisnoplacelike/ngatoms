import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsDialogHeader]',
  standalone: true,
  host: { class: 'nga-dialog-header' },
})
export class NgAtomsDialogHeaderDirective {}
