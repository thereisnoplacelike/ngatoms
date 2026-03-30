import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  afterNextRender,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type NgAtomsPopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

const OPPOSITE: Record<NgAtomsPopoverPlacement, NgAtomsPopoverPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

@Component({
  selector: 'nga-popover',
  standalone: true,
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.css',
  host: { class: 'nga-popover-root' },
})
export class NgAtomsPopoverComponent implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  readonly open = model<boolean>(false);
  readonly placement = input<NgAtomsPopoverPlacement>('bottom');

  readonly panelEl = viewChild.required<ElementRef<HTMLElement>>('panelEl');

  /** Resolved placement after flip logic — used for CSS animation class. */
  readonly activePlacement = signal<NgAtomsPopoverPlacement>('bottom');

  constructor() {
    afterNextRender(() => {
      this.renderer.appendChild(this.document.body, this.panelEl().nativeElement);
    });
  }

  toggle(): void {
    this.open.update(v => !v);
    if (this.open()) {
      requestAnimationFrame(() => this.position());
    }
  }

  close(): void {
    this.open.set(false);
  }

  private computeCoords(
    p: NgAtomsPopoverPlacement,
    triggerRect: DOMRect,
    panelRect: DOMRect,
    gap: number,
  ): { top: number; left: number } {
    switch (p) {
      case 'bottom':
        return {
          top: triggerRect.bottom + gap,
          left: triggerRect.left + triggerRect.width / 2 - panelRect.width / 2,
        };
      case 'top':
        return {
          top: triggerRect.top - panelRect.height - gap,
          left: triggerRect.left + triggerRect.width / 2 - panelRect.width / 2,
        };
      case 'left':
        return {
          top: triggerRect.top + triggerRect.height / 2 - panelRect.height / 2,
          left: triggerRect.left - panelRect.width - gap,
        };
      case 'right':
        return {
          top: triggerRect.top + triggerRect.height / 2 - panelRect.height / 2,
          left: triggerRect.right + gap,
        };
    }
  }

  private fits(top: number, left: number, panelRect: DOMRect, margin: number): boolean {
    return (
      top >= margin &&
      left >= margin &&
      top + panelRect.height <= window.innerHeight - margin &&
      left + panelRect.width <= window.innerWidth - margin
    );
  }

  private position(): void {
    const panel = this.panelEl().nativeElement;
    const triggerRect = this.el.nativeElement.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const gap = 8;
    const margin = 8;

    const preferred = this.placement();
    const fallback = OPPOSITE[preferred];

    const preferredCoords = this.computeCoords(preferred, triggerRect, panelRect, gap);
    const fallbackCoords = this.computeCoords(fallback, triggerRect, panelRect, gap);

    let resolved: NgAtomsPopoverPlacement;
    let top: number;
    let left: number;

    if (this.fits(preferredCoords.top, preferredCoords.left, panelRect, margin)) {
      resolved = preferred;
      ({ top, left } = preferredCoords);
    } else if (this.fits(fallbackCoords.top, fallbackCoords.left, panelRect, margin)) {
      resolved = fallback;
      ({ top, left } = fallbackCoords);
    } else {
      // Neither fits — use preferred, clamped to viewport
      resolved = preferred;
      top = Math.max(margin, Math.min(preferredCoords.top, window.innerHeight - panelRect.height - margin));
      left = Math.max(margin, Math.min(preferredCoords.left, window.innerWidth - panelRect.width - margin));
    }

    this.activePlacement.set(resolved);
    this.renderer.setStyle(panel, 'top', `${top}px`);
    this.renderer.setStyle(panel, 'left', `${left}px`);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (
      !this.el.nativeElement.contains(target) &&
      !this.panelEl().nativeElement.contains(target)
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }

  ngOnDestroy(): void {
    const panel = this.panelEl().nativeElement;
    if (panel.parentElement === this.document.body) {
      this.renderer.removeChild(this.document.body, panel);
    }
  }
}