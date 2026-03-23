import { Component, signal } from '@angular/core';
import { NgAtomsSwitchDirective } from '../../../components/switch';

@Component({
  selector: 'app-switch-page',
  standalone: true,
  imports: [NgAtomsSwitchDirective],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.css',
})
export class SwitchPageComponent {
  readonly stateOff = signal(false);
  readonly stateOn = signal(true);
  readonly notifications = signal(true);
  readonly autoSave = signal(true);
  readonly analytics = signal(false);
}
