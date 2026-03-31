import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';
import { NGA_DROPDOWN_MENU } from './dropdown-menu.component';

@Directive({
  selector: '[ngAtomsDropdownItem]',
  standalone: true,
  host: {
    class: 'nga-dropdown-item',
    role: 'menuitem',
    tabindex: '-1',
  },
})
export class NgAtomsDropdownItemDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly menu = inject(NGA_DROPDOWN_MENU);

  readonly disabled = input<boolean>(false);
  readonly destructive = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.renderer.setAttribute(this.el.nativeElement, 'aria-disabled', 'true');
        this.renderer.addClass(this.el.nativeElement, 'nga-dropdown-item--disabled');
      } else {
        this.renderer.removeAttribute(this.el.nativeElement, 'aria-disabled');
        this.renderer.removeClass(this.el.nativeElement, 'nga-dropdown-item--disabled');
      }
    });

    effect(() => {
      if (this.destructive()) {
        this.renderer.addClass(this.el.nativeElement, 'nga-dropdown-item--destructive');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'nga-dropdown-item--destructive');
      }
    });
  }

  @HostListener('click')
  onClick(): void {
    if (this.disabled()) return;
    this.menu.close();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.menu.focusNext(this.el.nativeElement);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.menu.focusPrev(this.el.nativeElement);
        break;
      case 'Home':
        event.preventDefault();
        this.menu.focusFirst();
        break;
      case 'End':
        event.preventDefault();
        this.menu.focusLast();
        break;
      case 'Tab':
        this.menu.close();
        break;
    }
  }
}
