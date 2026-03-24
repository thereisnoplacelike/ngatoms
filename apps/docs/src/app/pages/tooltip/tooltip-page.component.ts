import { Component } from '@angular/core';
import { NgAtomsTooltipDirective } from '../../../components/tooltip';
import { NgAtomsButtonDirective } from '../../../components/button';
import { NgAtomsBadgeDirective } from '../../../components/badge';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [NgAtomsTooltipDirective, NgAtomsButtonDirective, NgAtomsBadgeDirective],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.css',
})
export class TooltipPageComponent {}
