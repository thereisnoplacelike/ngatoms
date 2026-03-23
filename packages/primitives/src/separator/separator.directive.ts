import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsSeparatorOrientation = 'horizontal' | 'vertical';

@Directive({
  selector: '[ngAtomsSeparator]',
  standalone: true,
  host: {
    class: 'nga-separator',
    role: 'separator',
  },
})
export class NgAtomsSeparatorDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  readonly orientation = input<NgAtomsSeparatorOrientation>('horizontal');

  private _prevOrientation: NgAtomsSeparatorOrientation = 'horizontal';

  constructor() {
    effect(() => {
      const o = this.orientation();
      this.renderer.removeClass(this.el.nativeElement, `nga-separator--${this._prevOrientation}`);
      this.renderer.addClass(this.el.nativeElement, `nga-separator--${o}`);
      this.renderer.setAttribute(this.el.nativeElement, 'aria-orientation', o);
      this._prevOrientation = o;
    });
  }

  ngOnDestroy(): void {}
}
