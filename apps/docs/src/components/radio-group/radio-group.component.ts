import { Component, InjectionToken, ElementRef, Renderer2, effect, inject, input, model } from '@angular/core';

export type NgAtomsRadioGroupOrientation = 'horizontal' | 'vertical';

export interface NgAtomsRadioGroup {
  value: ReturnType<typeof model<string>>;
  name:  ReturnType<typeof input<string>>;
}

export const NGA_RADIO_GROUP = new InjectionToken<NgAtomsRadioGroup>('NGA_RADIO_GROUP');

let _nextId = 0;

@Component({
  selector: 'nga-radio-group',
  standalone: true,
  templateUrl: './radio-group.component.html',
  host: {
    class: 'nga-radio-group',
    role: 'radiogroup',
  },
  providers: [{ provide: NGA_RADIO_GROUP, useExisting: NgAtomsRadioGroupComponent }],
})
export class NgAtomsRadioGroupComponent {
  private readonly el       = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  readonly value       = model<string>('');
  readonly orientation = input<NgAtomsRadioGroupOrientation>('vertical');
  readonly name        = input<string>(`nga-radio-${_nextId++}`);

  private _prevOrientation: NgAtomsRadioGroupOrientation = 'vertical';

  constructor() {
    effect(() => {
      const o = this.orientation();
      this.renderer.removeClass(this.el.nativeElement, `nga-radio-group--${this._prevOrientation}`);
      this.renderer.addClass(this.el.nativeElement, `nga-radio-group--${o}`);
      this._prevOrientation = o;
    });
  }
}
