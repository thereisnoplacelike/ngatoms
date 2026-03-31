import {
  Component,
  ElementRef,
  HostListener,
  InjectionToken,
  OnDestroy,
  Renderer2,
  afterNextRender,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type NgAtomsDropdownPlacement = 'top' | 'bottom' | 'left' | 'right';
export type NgAtomsDropdownAlign = 'start' | 'center' | 'end';

export interface NgAtomsDropdownMenuContext {
  open: ReturnType<typeof model<boolean>>;
  close(): void;
  focusFirst(): void;
  focusLast(): void;
  focusNext(current: HTMLElement): void;
  focusPrev(current: HTMLElement): void;
}

export const NGA_DROPDOWN_MENU = new InjectionToken<NgAtomsDropdownMenuContext>('NGA_DROPDOWN_MENU');

const OPPOSITE: Record<NgAtomsDropdownPlacement, NgAtomsDropdownPlacement> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

@Component({
  selector: 'nga-dropdown-menu',
  standalone: true,
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
  host: { class: 'nga-dropdown-root' },
  providers: [{ provide: NGA_DROPDOWN_MENU, useExisting: NgAtomsDropdownMenuComponent }],
})
export class NgAtomsDropdownMenuComponent implements NgAtomsDropdownMenuContext, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  readonly open = model<boolean>(false);
  readonly placement = input<NgAtomsDropdownPlacement>('bottom');
  readonly align = input<NgAtomsDropdownAlign>('start');
  readonly activePlacement = signal<NgAtomsDropdownPlacement>('bottom');

  readonly panelEl = viewChild.required<ElementRef<HTMLElement>>('panelEl');

  constructor() {
    effect(() => {
      if (!this.open()) this.activePlacement.set(this.placement());
    });
    afterNextRender(() => {
      this.renderer.appendChild(this.document.body, this.panelEl().nativeElement);
    });
  }

  toggle(): void {
    this.open.update(v => !v);
    if (this.open()) {
      requestAnimationFrame(() => {
        this.position();
        this.focusFirst();
      });
    }
  }

  openAndFocusLast(): void {
    this.open.set(true);
    requestAnimationFrame(() => {
      this.position();
      this.focusLast();
    });
  }

  close(): void {
    this.open.set(false);
  }

  private items(): HTMLElement[] {
    return Array.from(
      this.panelEl().nativeElement.querySelectorAll<HTMLElement>(
        '.nga-dropdown-item:not([aria-disabled="true"])',
      ),
    );
  }

  focusFirst(): void {
    this.items()[0]?.focus();
  }

  focusLast(): void {
    const items = this.items();
    items[items.length - 1]?.focus();
  }

  focusNext(current: HTMLElement): void {
    const items = this.items();
    const idx = items.indexOf(current);
    items[(idx + 1) % items.length]?.focus();
  }

  focusPrev(current: HTMLElement): void {
    const items = this.items();
    const idx = items.indexOf(current);
    items[(idx - 1 + items.length) % items.length]?.focus();
  }

  private computeCoords(
    p: NgAtomsDropdownPlacement,
    a: NgAtomsDropdownAlign,
    tr: DOMRect,
    pr: DOMRect,
    gap: number,
  ): { top: number; left: number } {
    if (p === 'left' || p === 'right') {
      const left = p === 'left' ? tr.left - pr.width - gap : tr.right + gap;
      const top =
        a === 'start' ? tr.top :
        a === 'end'   ? tr.bottom - pr.height :
                        tr.top + tr.height / 2 - pr.height / 2;
      return { top, left };
    }

    const top = p === 'bottom' ? tr.bottom + gap : tr.top - pr.height - gap;
    const left =
      a === 'start' ? tr.left :
      a === 'end'   ? tr.right - pr.width :
                      tr.left + tr.width / 2 - pr.width / 2;
    return { top, left };
  }

  private fits(top: number, left: number, pr: DOMRect, margin: number): boolean {
    return (
      top >= margin &&
      left >= margin &&
      top + pr.height <= window.innerHeight - margin &&
      left + pr.width <= window.innerWidth - margin
    );
  }

  private position(): void {
    const panel = this.panelEl().nativeElement;
    const tr = this.el.nativeElement.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const gap = 4;
    const margin = 8;
    const p = this.placement();
    const a = this.align();
    const fb = OPPOSITE[p];

    const pc = this.computeCoords(p, a, tr, pr, gap);
    const fc = this.computeCoords(fb, a, tr, pr, gap);

    let resolved: NgAtomsDropdownPlacement;
    let top: number;
    let left: number;

    if (this.fits(pc.top, pc.left, pr, margin)) {
      resolved = p;
      ({ top, left } = pc);
    } else if (this.fits(fc.top, fc.left, pr, margin)) {
      resolved = fb;
      ({ top, left } = fc);
    } else {
      resolved = p;
      top = Math.max(margin, Math.min(pc.top, window.innerHeight - pr.height - margin));
      left = Math.max(margin, Math.min(pc.left, window.innerWidth - pr.width - margin));
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
