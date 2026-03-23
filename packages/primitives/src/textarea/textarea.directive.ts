import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsTextareaVariant = 'default' | 'filled' | 'ghost';
export type NgAtomsTextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: '[ngAtomsTextarea]',
  standalone: true,
  host: { class: 'nga-textarea' },
})
export class NgAtomsTextareaDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLTextAreaElement>);
  private readonly renderer = inject(Renderer2);

  readonly variant = input<NgAtomsTextareaVariant>('default');
  readonly size = input<NgAtomsTextareaSize>('md');
  readonly invalid = input<boolean>(false);
  readonly autoResize = input<boolean>(false);

  private _prevVariant: NgAtomsTextareaVariant = 'default';
  private _prevSize: NgAtomsTextareaSize = 'md';

  constructor() {
    effect(() => {
      const v = this.variant();
      this.renderer.removeClass(this.el.nativeElement, `nga-textarea--${this._prevVariant}`);
      this.renderer.addClass(this.el.nativeElement, `nga-textarea--${v}`);
      this._prevVariant = v;
    });

    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-textarea--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-textarea--${s}`);
      this._prevSize = s;
    });

    effect(() => {
      const el = this.el.nativeElement;
      if (this.invalid()) {
        this.renderer.addClass(el, 'nga-textarea--invalid');
        this.renderer.setAttribute(el, 'aria-invalid', 'true');
      } else {
        this.renderer.removeClass(el, 'nga-textarea--invalid');
        this.renderer.removeAttribute(el, 'aria-invalid');
      }
    });

    effect(() => {
      if (this.autoResize()) {
        this.renderer.setStyle(this.el.nativeElement, 'resize', 'none');
        this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
        this._onInput = this._resize.bind(this);
        this.el.nativeElement.addEventListener('input', this._onInput);
        this._resize();
      } else {
        if (this._onInput) {
          this.el.nativeElement.removeEventListener('input', this._onInput);
          this._onInput = null;
        }
        this.renderer.removeStyle(this.el.nativeElement, 'resize');
        this.renderer.removeStyle(this.el.nativeElement, 'overflow');
      }
    });
  }

  private _onInput: (() => void) | null = null;

  private _resize(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'height', 'auto');
    this.renderer.setStyle(el, 'height', `${el.scrollHeight}px`);
  }

  ngOnDestroy(): void {
    if (this._onInput) {
      this.el.nativeElement.removeEventListener('input', this._onInput);
    }
  }
}
