import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  effect,
  inject,
  input,
  model,
} from '@angular/core';

export type NgAtomsCheckboxSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: '[ngAtomsCheckbox]',
  standalone: true,
  host: {
    class: 'nga-checkbox',
    type: 'checkbox',
    role: 'checkbox',
  },
})
export class NgAtomsCheckboxDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly renderer = inject(Renderer2);

  readonly size = input<NgAtomsCheckboxSize>('md');
  readonly indeterminate = input<boolean>(false);
  readonly checked = model<boolean>(false);

  private _prevSize: NgAtomsCheckboxSize = 'md';

  constructor() {
    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-checkbox--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-checkbox--${s}`);
      this._prevSize = s;
    });

    effect(() => {
      this.el.nativeElement.indeterminate = this.indeterminate();
    });

    effect(() => {
      this.el.nativeElement.checked = this.checked();
    });
  }

  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }

}
