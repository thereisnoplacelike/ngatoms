import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type NgAtomsTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[ngAtomsTooltip]',
  standalone: true,
  host: { '[attr.aria-describedby]': 'tooltipId' },
})
export class NgAtomsTooltipDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  readonly ngAtomsTooltip = input.required<string>();
  readonly placement = input<NgAtomsTooltipPlacement>('top');
  readonly delay = input<number>(400);
  readonly disabled = input<boolean>(false);

  readonly tooltipId = `nga-tooltip-${Math.random().toString(36).slice(2, 9)}`;

  private tooltipEl: HTMLElement | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('mouseenter')
  @HostListener('focus')
  onShow(): void {
    if (this.disabled() || !this.ngAtomsTooltip()) return;
    this.clearTimer();
    this.showTimer = setTimeout(() => this.show(), this.delay());
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onHide(): void {
    this.hide();
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.hide();
  }

  private show(): void {
    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'nga-tooltip');
    this.renderer.addClass(this.tooltipEl, `nga-tooltip--${this.placement()}`);
    this.renderer.setProperty(this.tooltipEl!, 'textContent', this.ngAtomsTooltip());
    this.renderer.setAttribute(this.tooltipEl!, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipEl!, 'id', this.tooltipId);
    this.renderer.appendChild(this.document.body, this.tooltipEl);

    requestAnimationFrame(() => {
      if (!this.tooltipEl) return;
      const gap = 8;
      const trigger = this.el.nativeElement.getBoundingClientRect();
      const tip = this.tooltipEl.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (this.placement()) {
        case 'top':
          top = trigger.top - tip.height - gap;
          left = trigger.left + trigger.width / 2 - tip.width / 2;
          break;
        case 'bottom':
          top = trigger.bottom + gap;
          left = trigger.left + trigger.width / 2 - tip.width / 2;
          break;
        case 'left':
          top = trigger.top + trigger.height / 2 - tip.height / 2;
          left = trigger.left - tip.width - gap;
          break;
        case 'right':
          top = trigger.top + trigger.height / 2 - tip.height / 2;
          left = trigger.right + gap;
          break;
      }

      top = Math.max(8, Math.min(top, window.innerHeight - tip.height - 8));
      left = Math.max(8, Math.min(left, window.innerWidth - tip.width - 8));

      this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
    });
  }

  private hide(): void {
    this.clearTimer();
    if (this.tooltipEl) {
      this.renderer.removeChild(this.document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  private clearTimer(): void {
    if (this.showTimer !== null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
