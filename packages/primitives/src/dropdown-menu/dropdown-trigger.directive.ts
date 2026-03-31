import { Directive, HostListener, inject } from '@angular/core';
import { NgAtomsDropdownMenuComponent } from './dropdown-menu.component';

@Directive({
  selector: '[ngAtomsDropdownTrigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': 'menu.open()',
    '[class.nga-dropdown-trigger--open]': 'menu.open()',
  },
})
export class NgAtomsDropdownTriggerDirective {
  readonly menu = inject(NgAtomsDropdownMenuComponent);

  @HostListener('click')
  onClick(): void {
    this.menu.toggle();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.menu.open()) {
        this.menu.toggle();
      } else {
        this.menu.focusFirst();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.menu.open()) {
        this.menu.openAndFocusLast();
      } else {
        this.menu.focusLast();
      }
    }
  }
}
