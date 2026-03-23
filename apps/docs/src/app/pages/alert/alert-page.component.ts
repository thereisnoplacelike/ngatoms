import { Component } from '@angular/core';
import {
  NgAtomsAlertDirective,
  NgAtomsAlertTitleDirective,
  NgAtomsAlertDescriptionDirective,
} from '../../../components/alert';

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
  imports: [NgAtomsAlertDirective, NgAtomsAlertTitleDirective, NgAtomsAlertDescriptionDirective],
  templateUrl: './alert-page.component.html',
  styleUrl: './alert-page.component.css',
})
export class AlertPageComponent {
  readonly variants = VARIANTS;
  readonly meta = VARIANT_META;
}
