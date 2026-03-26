import { Component } from '@angular/core';
import { NgAtomsAvatarComponent } from '../../../components/avatar';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

@Component({
  selector: 'app-avatar-page',
  standalone: true,
  imports: [NgAtomsAvatarComponent, ComponentDemoComponent],
  templateUrl: './avatar-page.component.html',
  styleUrl: './avatar-page.component.css',
})
export class AvatarPageComponent {
  readonly sizes = SIZES;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'sizes.html',
      language: 'html',
      code: `<nga-avatar src="https://i.pravatar.cc/150" alt="Jane Doe" size="sm"></nga-avatar>
<nga-avatar src="https://i.pravatar.cc/150" alt="Jane Doe" size="md"></nga-avatar>
<nga-avatar src="https://i.pravatar.cc/150" alt="Jane Doe" size="lg"></nga-avatar>
<nga-avatar src="https://i.pravatar.cc/150" alt="Jane Doe" size="xl"></nga-avatar>`,
    },
    {
      name: 'fallbacks.html',
      language: 'html',
      code: `<!-- Initials fallback -->
<nga-avatar fallback="JD" size="md"></nga-avatar>

<!-- Icon fallback (no src or fallback) -->
<nga-avatar size="md"></nga-avatar>

<!-- Broken image → initials -->
<nga-avatar src="broken-url.jpg" fallback="AB" size="md"></nga-avatar>`,
    },
  ];
}
