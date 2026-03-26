import { Component, signal } from '@angular/core';
import { NgAtomsNumberInputComponent } from '../../../components/number-input';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-number-input-page',
  standalone: true,
  imports: [NgAtomsNumberInputComponent, ComponentDemoComponent],
  templateUrl: './number-input-page.component.html',
  styleUrl: './number-input-page.component.css',
})
export class NumberInputPageComponent {
  readonly qty      = signal(1);
  readonly rating   = signal(5);
  readonly temp     = signal(20.5);

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<nga-number-input [(value)]="qty" [min]="1" [max]="99"></nga-number-input>`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `qty = signal(1);`,
    },
  ];
}
