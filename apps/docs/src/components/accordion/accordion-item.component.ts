import {
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { NgAtomsAccordionComponent } from './accordion.component';

@Component({
  selector: 'nga-accordion-item',
  standalone: true,
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  host: {
    class: 'nga-accordion-item',
    '[class.nga-accordion-item--open]': 'isOpen()',
  },
})
export class NgAtomsAccordionItemComponent {
  private readonly accordion = inject(NgAtomsAccordionComponent);

  readonly value = input.required<string>();

  readonly isOpen = computed(() => this.accordion.openItems().has(this.value()));

  toggle(): void {
    this.accordion.toggle(this.value());
  }

}
