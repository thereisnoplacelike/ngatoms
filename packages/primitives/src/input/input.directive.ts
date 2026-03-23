import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsInputVariant = 'default' | 'filled' | 'ghost';

export type NgAtomsInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: '[ngAtomsInput]',
  standalone: true,
  host: { class: 'nga-input' },
})
export class NgAtomsInputDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly renderer = inject(Renderer2);

  readonly variant = input<NgAtomsInputVariant>('default');
  readonly size = input<NgAtomsInputSize>('md');
  readonly invalid = input<boolean>(false);

  private _prevVariant: NgAtomsInputVariant = 'default';
  private _prevSize: NgAtomsInputSize = 'md';

  constructor() {
    effect(() => {
      const v = this.variant();
      this.renderer.removeClass(this.el.nativeElement, `nga-input--${this._prevVariant}`);
      this.renderer.addClass(this.el.nativeElement, `nga-input--${v}`);
      this._prevVariant = v;
    });

    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-input--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-input--${s}`);
      this._prevSize = s;
    });

    effect(() => {
      const el = this.el.nativeElement;
      if (this.invalid()) {
        this.renderer.addClass(el, 'nga-input--invalid');
        this.renderer.setAttribute(el, 'aria-invalid', 'true');
      } else {
        this.renderer.removeClass(el, 'nga-input--invalid');
        this.renderer.removeAttribute(el, 'aria-invalid');
      }
    });
  }

  ngOnDestroy(): void {}
}
