import { Component, signal } from '@angular/core';
import { NgAtomsDatePickerComponent } from '../../../components/date-picker';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-date-picker-page',
  standalone: true,
  imports: [NgAtomsDatePickerComponent, ComponentDemoComponent],
  templateUrl: './date-picker-page.component.html',
  styleUrl: './date-picker-page.component.css',
})
export class DatePickerPageComponent {
  readonly single   = signal('');
  readonly rangeStart = signal('');
  readonly rangeEnd   = signal('');

  readonly today     = new Date();
  readonly minDate   = this.fmt(new Date(this.today.getFullYear(), this.today.getMonth(), 1));
  readonly maxDate   = this.fmt(new Date(this.today.getFullYear(), this.today.getMonth() + 2, 0));

  readonly availableDates = [
    this.fmt(new Date(this.today.getFullYear(), this.today.getMonth(), 3)),
    this.fmt(new Date(this.today.getFullYear(), this.today.getMonth(), 7)),
    this.fmt(new Date(this.today.getFullYear(), this.today.getMonth(), 12)),
    this.fmt(new Date(this.today.getFullYear(), this.today.getMonth(), 18)),
    this.fmt(new Date(this.today.getFullYear(), this.today.getMonth(), 24)),
  ];

  private fmt(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  readonly codeFiles: CodeFile[] = [
    {
      name: 'single.html',
      language: 'html',
      code: `<nga-date-picker [(value)]="date" />`,
    },
    {
      name: 'range.html',
      language: 'html',
      code: `<nga-date-picker
  mode="range"
  [(startDate)]="start"
  [(endDate)]="end"
  placeholder="Select a range"
/>`,
    },
    {
      name: 'constraints.html',
      language: 'html',
      code: `<nga-date-picker
  minDate="2026-01-01"
  maxDate="2026-12-31"
  [availableDates]="bookableDates"
/>`,
    },
    {
      name: 'i18n.html',
      language: 'html',
      code: `<nga-date-picker
  locale="pt-BR"
  [dayLabels]="['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá']"
  [monthLabels]="['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']"
/>`,
    },
  ];
}
