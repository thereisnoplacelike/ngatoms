import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';
import { NgAtomsTabsComponent } from './tabs.component';

@Directive({
  selector: '[ngAtomsTabPanel]',
  standalone: true,
  host: {
    class: 'nga-tab-panel',
    role: 'tabpanel',
  },
})
export class NgAtomsTabPanelDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly tabs = inject(NgAtomsTabsComponent);

  readonly value = input.required<string>();

  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'nga-tab-panel--hidden');

    effect(() => {
      const isActive = this.tabs.activeTab() === this.value();
      if (isActive) {
        this.renderer.removeClass(this.el.nativeElement, 'nga-tab-panel--hidden');
      } else {
        this.renderer.addClass(this.el.nativeElement, 'nga-tab-panel--hidden');
      }
    });
  }

}
