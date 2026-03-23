import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface NgAtomsSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type NgAtomsSelectVariant = 'default' | 'filled' | 'ghost';
export type NgAtomsSelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'nga-select',
  standalone: true,
  imports: [NgClass],
  host: { class: 'nga-select-root' },
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class NgAtomsSelectComponent implements AfterViewChecked, OnDestroy {
  private readonly el = inject(ElementRef);

  readonly searchInputEl = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly options = input<NgAtomsSelectOption[]>([]);
  readonly placeholder = input<string>('Select...');
  readonly multiple = input<boolean>(false);
  readonly searchable = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly variant = input<NgAtomsSelectVariant>('default');
  readonly size = input<NgAtomsSelectSize>('md');

  readonly value = model<string | string[] | null>(null);

  readonly isOpen = signal(false);
  readonly searchQuery = signal('');
  readonly focusedIndex = signal(-1);
  readonly panelAbove = signal(false);

  private _shouldFocusSearch = false;

  readonly filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.options();
    return this.options().filter(o => o.label.toLowerCase().includes(query));
  });

  readonly hasValue = computed(() => {
    const val = this.value();
    if (this.multiple()) return Array.isArray(val) && val.length > 0;
    return val !== null && val !== undefined && val !== '';
  });

  readonly displayValue = computed(() => {
    const val = this.value();
    const opts = this.options();
    if (this.multiple()) {
      const values = (Array.isArray(val) ? val : []) as string[];
      if (values.length === 0) return this.placeholder();
      if (values.length === 1) return opts.find(o => o.value === values[0])?.label ?? values[0];
      return `${values.length} selected`;
    }
    if (!val) return this.placeholder();
    return opts.find(o => o.value === (val as string))?.label ?? String(val);
  });

  readonly triggerClasses = computed(() => ({
    'nga-select-trigger': true,
    [`nga-select-trigger--${this.variant()}`]: true,
    [`nga-select-trigger--${this.size()}`]: true,
    'nga-select-trigger--open': this.isOpen(),
    'nga-select-trigger--invalid': this.invalid(),
  }));

  isSelected(optValue: string): boolean {
    const val = this.value();
    if (this.multiple()) return (Array.isArray(val) ? val : []).includes(optValue);
    return val === optValue;
  }

  toggleOpen(): void {
    if (this.disabled()) return;
    if (!this.isOpen()) {
      this.computePanelPosition();
      this.isOpen.set(true);
      if (this.searchable()) this._shouldFocusSearch = true;
    } else {
      this.close();
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.focusedIndex.set(-1);
  }

  selectOption(option: NgAtomsSelectOption): void {
    if (option.disabled) return;
    if (this.multiple()) {
      const current = (Array.isArray(this.value()) ? this.value() : []) as string[];
      const idx = current.indexOf(option.value);
      this.value.set(idx >= 0 ? current.filter(v => v !== option.value) : [...current, option.value]);
    } else {
      this.value.set(option.value);
      this.close();
    }
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.focusedIndex.set(-1);
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      if (!this.isOpen()) {
        this.toggleOpen();
      } else {
        const opts = this.filteredOptions();
        if (event.key === 'ArrowDown') this.focusedIndex.update(i => Math.min(i + 1, opts.length - 1));
        if (event.key === 'ArrowUp') this.focusedIndex.update(i => Math.max(i - 1, 0));
        if (event.key === 'Enter') {
          const idx = this.focusedIndex();
          if (idx >= 0 && idx < opts.length) this.selectOption(opts[idx]);
        }
      }
    }
  }

  onPanelKeydown(event: KeyboardEvent): void {
    const opts = this.filteredOptions();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusedIndex.update(i => Math.min(i + 1, opts.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusedIndex.update(i => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const idx = this.focusedIndex();
      if (idx >= 0 && idx < opts.length) this.selectOption(opts[idx]);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  ngAfterViewChecked(): void {
    if (this._shouldFocusSearch) {
      const input = this.searchInputEl();
      if (input) {
        input.nativeElement.focus();
        this._shouldFocusSearch = false;
      }
    }
  }

  private computePanelPosition(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    this.panelAbove.set(spaceBelow < 240 && rect.top > spaceBelow);
  }

  ngOnDestroy(): void {}
}
