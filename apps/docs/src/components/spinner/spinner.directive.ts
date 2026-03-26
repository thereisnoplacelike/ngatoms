import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsSpinnerSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: '[ngAtomsSpinner]',
  standalone: true,
  host: {
    class: 'nga-spinner',
    role: 'status',
    'aria-label': 'Loading',
  },
})
export class NgAtomsSpinnerDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  readonly size = input<NgAtomsSpinnerSize>('md');

  private _prevSize: NgAtomsSpinnerSize = 'md';

  constructor() {
    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-spinner--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-spinner--${s}`);
      this._prevSize = s;
    });
  }
}
