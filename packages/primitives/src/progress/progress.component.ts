import {
  Component,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsProgressSize    = 'sm' | 'md' | 'lg';
export type NgAtomsProgressVariant = 'default' | 'accent' | 'success' | 'destructive';

@Component({
  selector: 'nga-progress',
  standalone: true,
  template: `<div class="nga-progress__fill"></div>`,
  host: {
    class: 'nga-progress',
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
  },
})
export class NgAtomsProgressComponent {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  readonly value       = input<number>(0);
  readonly indeterminate = input<boolean>(false);
  readonly size        = input<NgAtomsProgressSize>('md');
  readonly variant     = input<NgAtomsProgressVariant>('default');

  private _prevSize:    NgAtomsProgressSize    = 'md';
  private _prevVariant: NgAtomsProgressVariant = 'default';

  constructor() {
    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-progress--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-progress--${s}`);
      this._prevSize = s;
    });

    effect(() => {
      const v = this.variant();
      this.renderer.removeClass(this.el.nativeElement, `nga-progress--${this._prevVariant}`);
      this.renderer.addClass(this.el.nativeElement, `nga-progress--${v}`);
      this._prevVariant = v;
    });

    effect(() => {
      const indeterminate = this.indeterminate();
      const fill = this.el.nativeElement.querySelector('.nga-progress__fill') as HTMLElement;

      if (indeterminate) {
        this.renderer.addClass(this.el.nativeElement, 'nga-progress--indeterminate');
        this.renderer.removeAttribute(this.el.nativeElement, 'aria-valuenow');
        fill.style.width = '40%';
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'nga-progress--indeterminate');
        const val = Math.min(100, Math.max(0, this.value()));
        this.renderer.setAttribute(this.el.nativeElement, 'aria-valuenow', String(val));
        fill.style.width = `${val}%`;
      }
    });
  }
}
