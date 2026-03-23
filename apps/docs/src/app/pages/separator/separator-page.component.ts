import { Component } from '@angular/core';
import { NgAtomsSeparatorDirective } from '../../../components/separator';

@Component({
  selector: 'app-separator-page',
  standalone: true,
  imports: [NgAtomsSeparatorDirective],
  templateUrl: './separator-page.component.html',
  styleUrl: './separator-page.component.css',
})
export class SeparatorPageComponent {}
