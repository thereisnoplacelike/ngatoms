import { Directive } from '@angular/core';

@Directive({ selector: '[ngAtomsCard]', standalone: true, host: { class: 'nga-card' } })
export class NgAtomsCardDirective {}

@Directive({ selector: '[ngAtomsCardHeader]', standalone: true, host: { class: 'nga-card-header' } })
export class NgAtomsCardHeaderDirective {}

@Directive({ selector: '[ngAtomsCardTitle]', standalone: true, host: { class: 'nga-card-title' } })
export class NgAtomsCardTitleDirective {}

@Directive({ selector: '[ngAtomsCardDescription]', standalone: true, host: { class: 'nga-card-description' } })
export class NgAtomsCardDescriptionDirective {}

@Directive({ selector: '[ngAtomsCardContent]', standalone: true, host: { class: 'nga-card-content' } })
export class NgAtomsCardContentDirective {}

@Directive({ selector: '[ngAtomsCardFooter]', standalone: true, host: { class: 'nga-card-footer' } })
export class NgAtomsCardFooterDirective {}
