import { Component } from '@angular/core';
import { NgAtomsTabsComponent } from '../../../components/tabs/tabs.component';
import { NgAtomsTabListDirective } from '../../../components/tabs/tab-list.directive';
import { NgAtomsTabTriggerDirective } from '../../../components/tabs/tab-trigger.directive';
import { NgAtomsTabPanelDirective } from '../../../components/tabs/tab-panel.directive';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [
    NgAtomsTabsComponent,
    NgAtomsTabListDirective,
    NgAtomsTabTriggerDirective,
    NgAtomsTabPanelDirective,
  ],
  templateUrl: './tabs-page.component.html',
  styleUrl: './tabs-page.component.css',
})
export class TabsPageComponent {}
