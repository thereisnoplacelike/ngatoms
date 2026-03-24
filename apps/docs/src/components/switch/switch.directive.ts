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

export type NgAtomsSwitchSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: '[ngAtomsSwitch]',
  standalone: true,
  host: {
    class: 'nga-switch',
    type: 'checkbox',
    role: 'switch',
  },
})
export class NgAtomsSwitchDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly renderer = inject(Renderer2);

  readonly size = input<NgAtomsSwitchSize>('md');
  readonly checked = model<boolean>(false);

  private _prevSize: NgAtomsSwitchSize = 'md';

  constructor() {
    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-switch--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-switch--${s}`);
      this._prevSize = s;
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
