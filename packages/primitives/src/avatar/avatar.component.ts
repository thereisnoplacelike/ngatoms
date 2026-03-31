import {
  Component,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

export type NgAtomsAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'nga-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  host: { class: 'nga-avatar' },
})
export class NgAtomsAvatarComponent {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  readonly src      = input<string>('');
  readonly alt      = input<string>('');
  readonly fallback = input<string>('');
  readonly size     = input<NgAtomsAvatarSize>('md');

  readonly imgError = signal(false);

  private _prevSize: NgAtomsAvatarSize = 'md';

  constructor() {
    effect(() => {
      this.src();
      this.imgError.set(false);
    });

    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-avatar--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-avatar--${s}`);
      this._prevSize = s;
    });
  }

  onError(): void {
    this.imgError.set(true);
  }
}
