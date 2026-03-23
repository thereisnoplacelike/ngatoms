import {
  Component,
  OnDestroy,
  effect,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'nga-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  host: { class: 'nga-accordion' },
})
export class NgAtomsAccordionComponent implements OnDestroy {
  readonly type = input<'single' | 'multiple'>('single');
  readonly collapsible = input<boolean>(true);
  readonly defaultValue = input<string | string[]>('');

  readonly openItems = signal<ReadonlySet<string>>(new Set());

  constructor() {
    effect(() => {
      const def = this.defaultValue();
      if (!def || (Array.isArray(def) && def.length === 0)) return;
      this.openItems.set(new Set(Array.isArray(def) ? def : [def]));
    });
  }

  toggle(value: string): void {
    const current = new Set(this.openItems());
    if (current.has(value)) {
      if (this.type() === 'single' && !this.collapsible()) return;
      current.delete(value);
    } else {
      if (this.type() === 'single') current.clear();
      current.add(value);
    }
    this.openItems.set(current);
  }

  ngOnDestroy(): void {}
}
