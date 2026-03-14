import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsButtonVariant =
  | 'primary'
  | 'outline'
  | 'ghost'
  | 'secondary'
  | 'destructive';

export type NgAtomsButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: '[ngAtomsButton]',
  standalone: true,
  host: { class: 'nga-btn' },
})
export class NgAtomsButtonDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLButtonElement>);
  private readonly renderer = inject(Renderer2);

  readonly variant = input<NgAtomsButtonVariant>('primary');
  readonly size = input<NgAtomsButtonSize>('md');
  readonly loading = input<boolean>(false);

  private _prevVariant: NgAtomsButtonVariant = 'primary';
  private _prevSize: NgAtomsButtonSize = 'md';
  private _spinnerEl: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const v = this.variant();
      this.renderer.removeClass(this.el.nativeElement, `nga-btn--${this._prevVariant}`);
      this.renderer.addClass(this.el.nativeElement, `nga-btn--${v}`);
      this._prevVariant = v;
    });

    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-btn--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-btn--${s}`);
      this._prevSize = s;
    });

    effect(() => {
      if (this.loading()) {
        this._activateLoading();
      } else {
        this._deactivateLoading();
      }
    });
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    if (this.loading()) {
      event.stopImmediatePropagation();
    }
  }

  ngOnDestroy(): void {
    if (this._spinnerEl) {
      this.renderer.removeChild(this.el.nativeElement, this._spinnerEl);
      this._spinnerEl = null;
    }
  }

  private _activateLoading(): void {
    if (this._spinnerEl) return;

    const el = this.el.nativeElement;
    this.renderer.setAttribute(el, 'aria-disabled', 'true');
    this.renderer.setAttribute(el, 'aria-busy', 'true');
    this.renderer.addClass(el, 'nga-btn--loading');

    const spinner: HTMLElement = this.renderer.createElement('span');
    this.renderer.addClass(spinner, 'nga-btn-spinner');
    this.renderer.setAttribute(spinner, 'aria-hidden', 'true');
    this.renderer.insertBefore(el, spinner, el.firstChild ?? null);
    this._spinnerEl = spinner;
  }

  private _deactivateLoading(): void {
    if (!this._spinnerEl) return;

    const el = this.el.nativeElement;
    this.renderer.removeChild(el, this._spinnerEl);
    this._spinnerEl = null;

    this.renderer.removeClass(el, 'nga-btn--loading');
    this.renderer.removeAttribute(el, 'aria-busy');

    if (!el.hasAttribute('disabled')) {
      this.renderer.removeAttribute(el, 'aria-disabled');
    }
  }
}
