import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsDialogDescription]',
  standalone: true,
  host: { class: 'nga-dialog-description' },
})
export class NgAtomsDialogDescriptionDirective {}
