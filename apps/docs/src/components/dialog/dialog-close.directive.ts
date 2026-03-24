import { Directive, HostListener, inject } from '@angular/core';
import { NgAtomsDialogComponent } from './dialog.component';

@Directive({
  selector: '[ngAtomsDialogClose]',
  standalone: true,
  host: {
    class: 'nga-dialog-close',
    type: 'button',
    'aria-label': 'Close dialog',
  },
})
export class NgAtomsDialogCloseDirective {
  private readonly dialog = inject(NgAtomsDialogComponent);

  @HostListener('click')
  onClick(): void {
    this.dialog.closeDialog();
  }
}
