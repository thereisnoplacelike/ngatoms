import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type NgAtomsDatePickerSize = 'sm' | 'md' | 'lg';
export type NgAtomsDatePickerMode = 'single' | 'range';

export interface NgAtomsCalendarDay {
  date: Date;
  dateStr: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

export type NgAtomsDatePickerView = 'days' | 'months' | 'years';


const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'nga-date-picker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  host: { class: 'nga-date-picker-root' },
})
export class NgAtomsDatePickerComponent implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  /** Single mode: the selected date (YYYY-MM-DD). */
  readonly value = model<string>('');
  /** Range mode: start of the selected range (YYYY-MM-DD). */
  readonly startDate = model<string>('');
  /** Range mode: end of the selected range (YYYY-MM-DD). */
  readonly endDate = model<string>('');

  readonly mode = input<NgAtomsDatePickerMode>('single');
  readonly size = input<NgAtomsDatePickerSize>('md');
  readonly invalid = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('Pick a date');
  readonly showToday = input<boolean>(false);
  readonly todayLabel = input<string>('Today');

  /** Earliest selectable date (YYYY-MM-DD). */
  readonly minDate = input<string>('');
  /** Latest selectable date (YYYY-MM-DD). */
  readonly maxDate = input<string>('');
  /**
   * Whitelist of selectable dates (YYYY-MM-DD[]).
   * When non-empty all other dates are disabled.
   */
  readonly availableDates = input<string[]>([]);

  /**
   * Locale used for trigger display text.
   * Defaults to browser locale. Example: 'en-US', 'pt-BR', 'fr-FR'.
   */
  readonly locale = input<string>(typeof navigator !== 'undefined' ? navigator.language : 'en-US');

  /**
   * Output format for the model value.
   * 'iso'    → YYYY-MM-DD (default, safe for date inputs / APIs)
   * 'locale' → formatted string using the locale input
   */
  readonly outputFormat = input<'iso' | 'locale'>('iso');

  /** Abbreviated day labels for the column headers (7 items, starting Sunday). */
  readonly dayLabels = input<string[]>(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);

  /** Full month names used in the month picker (12 items, January first). */
  readonly monthLabels = input<string[]>([
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]);

  readonly open = signal(false);
  readonly view = signal<NgAtomsDatePickerView>('days');
  readonly viewYear = signal(new Date().getFullYear());
  readonly viewMonth = signal(new Date().getMonth());
  /** Tracks hovered date for range preview (range mode only). */
  readonly hoverDate = signal('');

  readonly panelEl = viewChild.required<ElementRef<HTMLElement>>('panelEl');
  readonly monthsShort = MONTHS_SHORT;

  /** Year range shown in year picker: 12 years centred on viewYear. */
  readonly yearRange = computed(() => {
    const base = Math.floor(this.viewYear() / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => base + i);
  });

  readonly yearRangeLabel = computed(() => {
    const r = this.yearRange();
    return `${r[0]} – ${r[r.length - 1]}`;
  });

  // ── Display value ──────────────────────────────────────────

  readonly displayValue = computed(() => {
    if (this.mode() === 'single') {
      return this.formatDate(this.value());
    }
    const s = this.formatDate(this.startDate());
    const e = this.formatDate(this.endDate());
    if (!s) return '';
    return e ? `${s} → ${e}` : `${s} →`;
  });

  readonly monthLabel = computed(() => `${this.monthLabels()[this.viewMonth()]} ${this.viewYear()}`);

  // ── Calendar days ──────────────────────────────────────────

  readonly calendarDays = computed((): NgAtomsCalendarDay[] => {
    const year = this.viewYear();
    const month = this.viewMonth();
    const today = new Date();

    const single     = this.value();
    const start      = this.startDate();
    const end        = this.endDate();
    const hover      = this.hoverDate();
    const isRange    = this.mode() === 'range';
    const minDate    = this.minDate();
    const maxDate    = this.maxDate();
    const available  = new Set(this.availableDates());

    // Effective range end: use committed end, or hover preview when only start is set
    const rawEnd = isRange && start && !end ? hover : end;
    const [lo, hi] = rawEnd ? ([start, rawEnd].sort() as [string, string]) : [start, ''];

    const days: NgAtomsCalendarDay[] = [];
    const firstDow   = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const push = (date: Date, isCurrentMonth: boolean) => {
      const dateStr = this.toDateStr(date);
      const isDisabled =
        (!!minDate && dateStr < minDate) ||
        (!!maxDate && dateStr > maxDate) ||
        (available.size > 0 && !available.has(dateStr));

      const isSelected    = isRange ? (dateStr === lo || dateStr === hi) : dateStr === single;
      const isRangeStart  = isRange && !!lo && dateStr === lo;
      const isRangeEnd    = isRange && !!hi && dateStr === hi;
      const isInRange     = isRange && !!lo && !!hi && dateStr > lo && dateStr < hi;

      days.push({
        date, dateStr, day: date.getDate(), isCurrentMonth,
        isToday: date.toDateString() === today.toDateString(),
        isSelected, isRangeStart, isRangeEnd, isInRange, isDisabled,
      });
    };

    for (let i = firstDow - 1; i >= 0; i--) push(new Date(year, month, -i), false);
    for (let d = 1; d <= daysInMonth; d++)  push(new Date(year, month, d), true);
    let t = 1;
    while (days.length < 42) push(new Date(year, month + 1, t++), false);

    return days;
  });

  // ── Constructor ────────────────────────────────────────────

  constructor() {
    afterNextRender(() => {
      this.renderer.appendChild(this.document.body, this.panelEl().nativeElement);
    });
  }

  // ── Helpers ────────────────────────────────────────────────

  /** Internal ISO representation — always YYYY-MM-DD. */
  private toDateStr(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  /** Value emitted to the model — ISO or locale-formatted depending on outputFormat. */
  private toOutputStr(date: Date): string {
    if (this.outputFormat() === 'locale') {
      return date.toLocaleDateString(this.locale(), { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    return this.toDateStr(date);
  }

  /** Parses a stored value (ISO) back to a Date for display. */
  private parseIso(str: string): Date | null {
    if (!str) return null;
    const [y, m, d] = str.split(/[-\/]/).map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  /** Formats a stored value for trigger display. */
  private formatDate(str: string): string {
    if (!str) return '';
    const date = this.parseIso(str);
    if (!date) return str;
    return date.toLocaleDateString(this.locale(), { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // ── Interactions ───────────────────────────────────────────

  toggle(): void {
    if (this.disabled()) return;
    this.open.update(v => !v);
    if (this.open()) {
      // Navigate to relevant month
      const anchor = this.mode() === 'range' ? this.startDate() : this.value();
      if (anchor) {
        const [year, month] = anchor.split('-').map(Number);
        this.viewYear.set(year);
        this.viewMonth.set(month - 1);
      }
      requestAnimationFrame(() => this.position());
    }
  }

  close(): void {
    this.open.set(false);
    this.hoverDate.set('');
    this.view.set('days');
  }

  // ── Month / year picker ────────────────────────────────────

  toggleMonthView(): void {
    this.view.set(this.view() === 'months' ? 'days' : 'months');
  }

  toggleYearView(): void {
    this.view.set(this.view() === 'years' ? 'days' : 'years');
  }

  selectMonth(month: number): void {
    this.viewMonth.set(month);
    this.view.set('days');
  }

  selectYear(year: number): void {
    this.viewYear.set(year);
    this.view.set('days');
  }

  prevYearRange(): void {
    this.viewYear.update(y => y - 12);
  }

  nextYearRange(): void {
    this.viewYear.update(y => y + 12);
  }

  selectDay(day: NgAtomsCalendarDay): void {
    if (day.isDisabled) return;

    if (this.mode() === 'single') {
      this.value.set(this.toOutputStr(day.date));
      this.close();
      return;
    }

    // Range mode
    const start = this.startDate();
    const end   = this.endDate();

    if (!start || (start && end)) {
      // Start fresh
      this.startDate.set(this.toOutputStr(day.date));
      this.endDate.set('');
    } else {
      // Start is set, no end yet
      if (day.dateStr === start) {
        // Deselect
        this.startDate.set('');
      } else if (day.dateStr < start) {
        // Clicked before start → becomes new start
        this.startDate.set(this.toOutputStr(day.date));
      } else {
        // Valid end date
        this.endDate.set(this.toOutputStr(day.date));
        this.hoverDate.set('');
        this.close();
      }
    }
  }

  selectToday(): void {
    const today = new Date();
    const todayStr = this.toOutputStr(today);
    if (this.mode() === 'single') {
      this.value.set(todayStr);
    } else {
      this.startDate.set(todayStr);
      this.endDate.set('');
    }
    this.viewYear.set(today.getFullYear());
    this.viewMonth.set(today.getMonth());
    this.view.set('days');
    this.close();
  }

  onDayHover(day: NgAtomsCalendarDay): void {
    if (this.mode() === 'range' && this.startDate() && !this.endDate()) {
      this.hoverDate.set(day.dateStr);
    }
  }

  onGridLeave(): void {
    this.hoverDate.set('');
  }

  prevMonth(): void {
    if (this.viewMonth() === 0) { this.viewMonth.set(11); this.viewYear.update(y => y - 1); }
    else { this.viewMonth.update(m => m - 1); }
  }

  nextMonth(): void {
    if (this.viewMonth() === 11) { this.viewMonth.set(0); this.viewYear.update(y => y + 1); }
    else { this.viewMonth.update(m => m + 1); }
  }

  // ── Positioning ────────────────────────────────────────────

  private position(): void {
    const panel = this.panelEl().nativeElement;
    const tr    = this.el.nativeElement.getBoundingClientRect();
    const pr    = panel.getBoundingClientRect();
    const gap   = 4;
    const margin = 8;

    let top  = tr.bottom + gap;
    let left = tr.left;

    if (top + pr.height > window.innerHeight - margin) top = tr.top - pr.height - gap;
    left = Math.max(margin, Math.min(left, window.innerWidth - pr.width - margin));

    this.renderer.setStyle(panel, 'top',  `${top}px`);
    this.renderer.setStyle(panel, 'left', `${left}px`);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (!this.el.nativeElement.contains(target) && !this.panelEl().nativeElement.contains(target)) {
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
