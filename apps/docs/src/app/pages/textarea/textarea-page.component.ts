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
      name: 'variants.html',
      language: 'html',
      code: `<textarea ngAtomsTextarea placeholder="Default"></textarea>
<textarea ngAtomsTextarea variant="filled" placeholder="Filled"></textarea>
<textarea ngAtomsTextarea variant="ghost" placeholder="Ghost"></textarea>`,
    },
    {
      name: 'sizes.html',
      language: 'html',
      code: `<textarea ngAtomsTextarea size="xs" placeholder="Extra small"></textarea>
<textarea ngAtomsTextarea size="sm" placeholder="Small"></textarea>
<textarea ngAtomsTextarea size="md" placeholder="Medium"></textarea>
<textarea ngAtomsTextarea size="lg" placeholder="Large"></textarea>
<textarea ngAtomsTextarea size="xl" placeholder="Extra large"></textarea>`,
    },
    {
      name: 'states.html',
      language: 'html',
      code: `<!-- Invalid -->
<textarea ngAtomsTextarea [invalid]="true" placeholder="This field has an error"></textarea>

<!-- Disabled -->
<textarea ngAtomsTextarea placeholder="Disabled textarea" disabled></textarea>

<!-- Readonly -->
<textarea ngAtomsTextarea readonly>This content is read-only.</textarea>

<!-- Auto-resize -->
<textarea ngAtomsTextarea [autoResize]="true" placeholder="Type to auto-resize..."></textarea>`,
    },
  ];
}
