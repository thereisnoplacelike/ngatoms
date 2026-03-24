import { Directive } from '@angular/core';

@Directive({
  selector: '[ngAtomsDialogFooter]',
  standalone: true,
  host: { class: 'nga-dialog-footer' },
})
export class NgAtomsDialogFooterDirective {}
