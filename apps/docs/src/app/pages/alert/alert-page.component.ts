import { Component } from '@angular/core';
import {
  NgAtomsAlertDirective,
  NgAtomsAlertTitleDirective,
  NgAtomsAlertDescriptionDirective,
} from '../../../components/alert';
import { ComponentDemoComponent, CodeFile } from '../../../components/component-demo/component-demo.component';

const VARIANTS = ['default', 'info', 'success', 'warning', 'destructive'] as const;

type Variant = typeof VARIANTS[number];

const VARIANT_META: Record<Variant, { icon: string; title: string; description: string }> = {
  default:     { icon: 'ph-bold ph-bell',             title: 'Heads up',             description: 'You can add components to your app using the CLI.' },
  info:        { icon: 'ph-bold ph-info',             title: 'New version available', description: 'Version 2.0 includes breaking changes. Review the migration guide.' },
  success:     { icon: 'ph-bold ph-check-circle',     title: 'Deployment successful', description: 'Your changes have been deployed to production.' },
  warning:     { icon: 'ph-bold ph-warning',          title: 'Unsaved changes',       description: 'You have unsaved changes. They will be lost if you navigate away.' },
  destructive: { icon: 'ph-bold ph-x-circle',         title: 'Action required',       description: 'Your account will be deactivated in 24 hours. Please verify your email.' },
};

@Component({
  selector: 'app-alert-page',
  standalone: true,
  imports: [
    NgAtomsAlertDirective,
    NgAtomsAlertTitleDirective,
    NgAtomsAlertDescriptionDirective,
    ComponentDemoComponent,
  ],
  templateUrl: './alert-page.component.html',
  styleUrl: './alert-page.component.css',
})
export class AlertPageComponent {
  readonly variants = VARIANTS;
  readonly meta = VARIANT_META;

  readonly codeFiles: CodeFile[] = [
    {
      name: 'example.component.html',
      language: 'html',
      code: `<div ngAtomsAlert variant="default">
  <i class="ph-bold ph-bell"></i>
  <div>
    <p ngAtomsAlertTitle>Heads up</p>
    <p ngAtomsAlertDescription>You can add components to your app using the CLI.</p>
  </div>
</div>

<div ngAtomsAlert variant="info">
  <i class="ph-bold ph-info"></i>
  <div>
    <p ngAtomsAlertTitle>New version available</p>
    <p ngAtomsAlertDescription>Version 2.0 includes breaking changes. Review the migration guide.</p>
  </div>
</div>

<div ngAtomsAlert variant="success">
  <i class="ph-bold ph-check-circle"></i>
  <div>
    <p ngAtomsAlertTitle>Deployment successful</p>
    <p ngAtomsAlertDescription>Your changes have been deployed to production.</p>
  </div>
</div>

<div ngAtomsAlert variant="warning">
  <i class="ph-bold ph-warning"></i>
  <div>
    <p ngAtomsAlertTitle>Unsaved changes</p>
    <p ngAtomsAlertDescription>You have unsaved changes. They will be lost if you navigate away.</p>
  </div>
</div>

<div ngAtomsAlert variant="destructive">
  <i class="ph-bold ph-x-circle"></i>
  <div>
    <p ngAtomsAlertTitle>Action required</p>
    <p ngAtomsAlertDescription>Your account will be deactivated in 24 hours. Please verify your email.</p>
  </div>
</div>`,
    },
  ];
}
