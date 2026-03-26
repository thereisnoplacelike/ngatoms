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
      name: 'example.component.html',
      language: 'html',
      code: `<!-- With image -->
<nga-avatar src="https://i.pravatar.cc/150" alt="Jane Doe"></nga-avatar>

<!-- With initials fallback -->
<nga-avatar fallback="JD"></nga-avatar>

<!-- Icon fallback (no src or fallback) -->
<nga-avatar></nga-avatar>`,
    },
  ];
}
