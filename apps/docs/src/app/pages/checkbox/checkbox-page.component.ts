import { Component, signal } from '@angular/core';
import { NgAtomsCheckboxDirective } from '../../../components/checkbox';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [NgAtomsCheckboxDirective],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.css',
})
export class CheckboxPageComponent {
  readonly checked = signal(true);
  readonly unchecked = signal(false);
  readonly indeterminate = signal(false);
}
