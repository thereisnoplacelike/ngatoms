import { Component } from '@angular/core';
import { NgAtomsTabsComponent } from '../../../components/tabs/tabs.component';
import { NgAtomsTabListDirective } from '../../../components/tabs/tab-list.directive';
import { NgAtomsTabTriggerDirective } from '../../../components/tabs/tab-trigger.directive';
import { NgAtomsTabPanelDirective } from '../../../components/tabs/tab-panel.directive';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [
    NgAtomsTabsComponent,
    NgAtomsTabListDirective,
    NgAtomsTabTriggerDirective,
    NgAtomsTabPanelDirective,
    ComponentDemoComponent,
  ],
  templateUrl: './tabs-page.component.html',
  styleUrl: './tabs-page.component.css',
})
export class TabsPageComponent {
  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<nga-tabs defaultValue="tab1">
  <div ngAtomsTabList>
    <button ngAtomsTabTrigger value="tab1">Account</button>
    <button ngAtomsTabTrigger value="tab2">Security</button>
    <button ngAtomsTabTrigger value="tab3">Notifications</button>
  </div>

  <div ngAtomsTabPanel value="tab1">
    Account settings content here.
  </div>
  <div ngAtomsTabPanel value="tab2">
    Security settings content here.
  </div>
  <div ngAtomsTabPanel value="tab3">
    Notification preferences here.
  </div>
</nga-tabs>

<!-- Pills variant -->
<nga-tabs defaultValue="overview" variant="pills">
  <div ngAtomsTabList>
    <button ngAtomsTabTrigger value="overview">Overview</button>
    <button ngAtomsTabTrigger value="analytics">Analytics</button>
  </div>
  <div ngAtomsTabPanel value="overview">Overview content.</div>
  <div ngAtomsTabPanel value="analytics">Analytics content.</div>
</nga-tabs>`,
    },
  ];
}
