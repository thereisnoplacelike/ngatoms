import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';
import { NGA_RADIO_GROUP } from './radio-group.component';

export type NgAtomsRadioSize = 'sm' | 'md' | 'lg';

@Directive({
  selector: '[ngAtomsRadio]',
  standalone: true,
  host: {
    class: 'nga-radio',
    type: 'radio',
  },
})
export class NgAtomsRadioDirective {
  private readonly el       = inject(ElementRef<HTMLInputElement>);
  private readonly renderer = inject(Renderer2);
  private readonly group    = inject(NGA_RADIO_GROUP, { optional: true });

  readonly value = input<string>('');
  readonly size  = input<NgAtomsRadioSize>('md');

  private _prevSize: NgAtomsRadioSize = 'md';

  constructor() {
    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-radio--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-radio--${s}`);
      this._prevSize = s;
    });

    effect(() => {
      if (this.group) {
        this.el.nativeElement.name    = this.group.name();
        this.el.nativeElement.checked = this.group.value() === this.value();
      }
    });
  }

  @HostListener('change')
  onChange(): void {
    this.group?.value.set(this.value());
  }
}
