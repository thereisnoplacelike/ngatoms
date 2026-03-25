import { Component } from '@angular/core';
import { NgAtomsTextareaDirective } from '../../../components/textarea';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const VARIANTS = ['default', 'filled', 'ghost'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

@Component({
  selector: 'app-textarea-page',
  standalone: true,
  imports: [NgAtomsTextareaDirective, ComponentDemoComponent],
  templateUrl: './textarea-page.component.html',
  styleUrl: './textarea-page.component.css',
})
export class TextareaPageComponent {
  readonly variants = VARIANTS;
  readonly sizes = SIZES;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<!-- Default variant -->
<textarea ngAtomsTextarea placeholder="Enter your message..."></textarea>

<!-- Filled variant -->
<textarea ngAtomsTextarea variant="filled" placeholder="Enter your message..."></textarea>

<!-- Ghost variant -->
<textarea ngAtomsTextarea variant="ghost" placeholder="Enter your message..."></textarea>

<!-- Auto-resize -->
<textarea ngAtomsTextarea [autoResize]="true" placeholder="Type to auto-resize..."></textarea>

<!-- Invalid state -->
<textarea ngAtomsTextarea [invalid]="true" placeholder="This field has an error"></textarea>

<!-- Disabled -->
<textarea ngAtomsTextarea placeholder="Disabled textarea" disabled></textarea>`,
    },
  ];
}
