import { Component } from '@angular/core';
import {
  NgAtomsCardDirective,
  NgAtomsCardHeaderDirective,
  NgAtomsCardTitleDirective,
  NgAtomsCardDescriptionDirective,
  NgAtomsCardContentDirective,
  NgAtomsCardFooterDirective,
} from '../../../components/card';
import { NgAtomsBadgeDirective } from '../../../components/badge';
import { NgAtomsButtonDirective } from '../../../components/button';
import { NgAtomsSeparatorDirective } from '../../../components/separator';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [
    NgAtomsCardDirective,
    NgAtomsCardHeaderDirective,
    NgAtomsCardTitleDirective,
    NgAtomsCardDescriptionDirective,
    NgAtomsCardContentDirective,
    NgAtomsCardFooterDirective,
    NgAtomsBadgeDirective,
    NgAtomsButtonDirective,
    NgAtomsSeparatorDirective,
  ],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.css',
})
export class CardPageComponent {}
