import { Component, signal } from '@angular/core';
import { NgAtomsDialogComponent } from '../../../components/dialog/dialog.component';
import { NgAtomsDialogHeaderDirective } from '../../../components/dialog/dialog-header.directive';
import { NgAtomsDialogTitleDirective } from '../../../components/dialog/dialog-title.directive';
import { NgAtomsDialogDescriptionDirective } from '../../../components/dialog/dialog-description.directive';
import { NgAtomsDialogBodyDirective } from '../../../components/dialog/dialog-body.directive';
import { NgAtomsDialogFooterDirective } from '../../../components/dialog/dialog-footer.directive';
import { NgAtomsDialogCloseDirective } from '../../../components/dialog/dialog-close.directive';
import { NgAtomsButtonDirective } from '../../../components/button';

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
  ],
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.css',
})
export class DialogPageComponent {
  readonly editOpen = signal(false);
  readonly confirmOpen = signal(false);
  readonly largeOpen = signal(false);
}
