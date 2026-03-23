import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsBadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'success';

@Directive({
  selector: '[ngAtomsBadge]',
  standalone: true,
  host: { class: 'nga-badge' },
})
export class NgAtomsBadgeDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  readonly variant = input<NgAtomsBadgeVariant>('default');

  private _prevVariant: NgAtomsBadgeVariant = 'default';

  constructor() {
    effect(() => {
      const v = this.variant();
      this.renderer.removeClass(this.el.nativeElement, `nga-badge--${this._prevVariant}`);
      this.renderer.addClass(this.el.nativeElement, `nga-badge--${v}`);
      this._prevVariant = v;
    });
  }

  ngOnDestroy(): void {}
}
