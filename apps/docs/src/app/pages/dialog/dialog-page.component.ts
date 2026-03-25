import { Component, signal } from '@angular/core';
import { NgAtomsDialogComponent } from '../../../components/dialog/dialog.component';
import { NgAtomsDialogHeaderDirective } from '../../../components/dialog/dialog-header.directive';
import { NgAtomsDialogTitleDirective } from '../../../components/dialog/dialog-title.directive';
import { NgAtomsDialogDescriptionDirective } from '../../../components/dialog/dialog-description.directive';
import { NgAtomsDialogBodyDirective } from '../../../components/dialog/dialog-body.directive';
import { NgAtomsDialogFooterDirective } from '../../../components/dialog/dialog-footer.directive';
import { NgAtomsDialogCloseDirective } from '../../../components/dialog/dialog-close.directive';
import { NgAtomsButtonDirective } from '../../../components/button';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-dialog-page',
  standalone: true,
  imports: [
    NgAtomsDialogComponent,
    NgAtomsDialogHeaderDirective,
    NgAtomsDialogTitleDirective,
    NgAtomsDialogDescriptionDirective,
    NgAtomsDialogBodyDirective,
    NgAtomsDialogFooterDirective,
    NgAtomsDialogCloseDirective,
    NgAtomsButtonDirective,
    ComponentDemoComponent,
  ],
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.css',
})
export class DialogPageComponent {
  readonly editOpen = signal(false);
  readonly confirmOpen = signal(false);
  readonly largeOpen = signal(false);

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<button ngAtomsButton (click)="isOpen.set(true)">Open dialog</button>

<nga-dialog [(open)]="isOpen">
  <div ngAtomsDialogHeader>
    <div>
      <h2 ngAtomsDialogTitle>Edit profile</h2>
      <p ngAtomsDialogDescription>Update your display name and email address.</p>
    </div>
    <button ngAtomsDialogClose>✕</button>
  </div>
  <div ngAtomsDialogBody>
    <input type="text" placeholder="Display name" />
  </div>
  <div ngAtomsDialogFooter>
    <button ngAtomsButton variant="outline" (click)="isOpen.set(false)">Cancel</button>
    <button ngAtomsButton (click)="isOpen.set(false)">Save changes</button>
  </div>
</nga-dialog>`,
    },
    {
      name: 'example.component.ts',
      language: 'typescript',
      code: `import { Component, signal } from '@angular/core';
import { NgAtomsDialogComponent } from './components/dialog/dialog.component';
import { NgAtomsDialogHeaderDirective } from './components/dialog/dialog-header.directive';
import { NgAtomsDialogTitleDirective } from './components/dialog/dialog-title.directive';
import { NgAtomsDialogDescriptionDirective } from './components/dialog/dialog-description.directive';
import { NgAtomsDialogBodyDirective } from './components/dialog/dialog-body.directive';
import { NgAtomsDialogFooterDirective } from './components/dialog/dialog-footer.directive';
import { NgAtomsDialogCloseDirective } from './components/dialog/dialog-close.directive';
import { NgAtomsButtonDirective } from './components/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    NgAtomsDialogComponent,
    NgAtomsDialogHeaderDirective,
    NgAtomsDialogTitleDirective,
    NgAtomsDialogDescriptionDirective,
    NgAtomsDialogBodyDirective,
    NgAtomsDialogFooterDirective,
    NgAtomsDialogCloseDirective,
    NgAtomsButtonDirective,
  ],
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  readonly isOpen = signal(false);
}`,
    },
  ];
}
