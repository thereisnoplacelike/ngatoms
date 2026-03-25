import { Component, input } from '@angular/core';
import { NgAtomsTabsComponent } from '../tabs/tabs.component';
import { NgAtomsTabListDirective } from '../tabs/tab-list.directive';
import { NgAtomsTabTriggerDirective } from '../tabs/tab-trigger.directive';
import { NgAtomsTabPanelDirective } from '../tabs/tab-panel.directive';
import { CodeBlockComponent } from '../code-block/code-block.component';

export interface CodeFile {
  name: string;
  code: string;
  language: string;
}

@Component({
  selector: 'app-component-demo',
  standalone: true,
  imports: [
    NgAtomsTabsComponent,
    NgAtomsTabListDirective,
    NgAtomsTabTriggerDirective,
    NgAtomsTabPanelDirective,
    CodeBlockComponent,
  ],
  templateUrl: './component-demo.component.html',
  styleUrl: './component-demo.component.css',
})
export class ComponentDemoComponent {
  files = input<CodeFile[]>([]);
}
