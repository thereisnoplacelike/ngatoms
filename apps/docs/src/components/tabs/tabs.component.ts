import {
  Component,
  effect,
  input,
  signal,
} from '@angular/core';

export type NgAtomsTabsVariant = 'underline' | 'pills';

export class NgAtomsTabTriggerDirectiveRef {
  value!: () => string;
  focus!: () => void;
}

@Component({
  selector: 'nga-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  host: {
    class: 'nga-tabs',
    '[class.nga-tabs--underline]': "variant() === 'underline'",
    '[class.nga-tabs--pills]': "variant() === 'pills'",
  },
})
export class NgAtomsTabsComponent {
  readonly defaultValue = input<string>('');
  readonly variant = input<NgAtomsTabsVariant>('underline');

  readonly activeTab = signal<string>('');

  private readonly _triggers: NgAtomsTabTriggerDirectiveRef[] = [];

  constructor() {
    effect(() => {
      const def = this.defaultValue();
      if (def && !this.activeTab()) {
        this.activeTab.set(def);
      }
    });
  }

  setActive(value: string): void {
    this.activeTab.set(value);
  }

  register(trigger: NgAtomsTabTriggerDirectiveRef): void {
    this._triggers.push(trigger);
    if (!this.activeTab() && this._triggers.length === 1) {
      this.activeTab.set(trigger.value());
    }
  }

  unregister(trigger: NgAtomsTabTriggerDirectiveRef): void {
    const idx = this._triggers.indexOf(trigger);
    if (idx >= 0) this._triggers.splice(idx, 1);
  }

  navigateNext(): void {
    const idx = this._triggers.findIndex(t => t.value() === this.activeTab());
    const next = this._triggers[(idx + 1) % this._triggers.length];
    if (next) { this.setActive(next.value()); next.focus(); }
  }

  navigatePrev(): void {
    const idx = this._triggers.findIndex(t => t.value() === this.activeTab());
    const prev = this._triggers[(idx - 1 + this._triggers.length) % this._triggers.length];
    if (prev) { this.setActive(prev.value()); prev.focus(); }
  }

}
