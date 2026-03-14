// @ts-nocheck
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgAtomsButtonDirective } from './button.directive';

// ── Helpers ───────────────────────────────────────────────────

function createFixture<T>(component: new () => T) {
  TestBed.configureTestingModule({ imports: [component] });
  const fixture = TestBed.createComponent(component as any);
  fixture.detectChanges();
  return fixture;
}

// ── Defaults ──────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton>Click</button>`,
})
class DefaultButtonFixture {}

describe('NgAtomsButtonDirective — defaults', () => {
  it('applies nga-btn base class', () => {
    const fixture = createFixture(DefaultButtonFixture);
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn')).toBe(true);
  });

  it('applies nga-btn--primary by default', () => {
    const fixture = createFixture(DefaultButtonFixture);
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--primary')).toBe(true);
  });

  it('applies nga-btn--md by default', () => {
    const fixture = createFixture(DefaultButtonFixture);
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--md')).toBe(true);
  });
});

// ── Variant classes ───────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton [variant]="variant">Click</button>`,
})
class VariantButtonFixture {
  variant: 'primary' | 'outline' | 'ghost' | 'secondary' | 'destructive' = 'primary';
}

describe('NgAtomsButtonDirective — variant', () => {
  const variants = ['primary', 'outline', 'ghost', 'secondary', 'destructive'] as const;

  for (const v of variants) {
    it(`applies nga-btn--${v} when variant="${v}"`, () => {
      const fixture = createFixture(VariantButtonFixture);
      fixture.componentInstance.variant = v;
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
      expect(btn.classList.contains(`nga-btn--${v}`)).toBe(true);
    });
  }

  it('removes previous variant class when variant changes', () => {
    const fixture = createFixture(VariantButtonFixture);
    fixture.componentInstance.variant = 'primary';
    fixture.detectChanges();
    fixture.componentInstance.variant = 'destructive';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--primary')).toBe(false);
    expect(btn.classList.contains('nga-btn--destructive')).toBe(true);
  });
});

// ── Size classes ──────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton [size]="size">Click</button>`,
})
class SizeButtonFixture {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}

describe('NgAtomsButtonDirective — size', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  for (const s of sizes) {
    it(`applies nga-btn--${s} when size="${s}"`, () => {
      const fixture = createFixture(SizeButtonFixture);
      fixture.componentInstance.size = s;
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
      expect(btn.classList.contains(`nga-btn--${s}`)).toBe(true);
    });
  }

  it('removes previous size class when size changes', () => {
    const fixture = createFixture(SizeButtonFixture);
    fixture.componentInstance.size = 'lg';
    fixture.detectChanges();
    fixture.componentInstance.size = 'xs';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--lg')).toBe(false);
    expect(btn.classList.contains('nga-btn--xs')).toBe(true);
  });
});

// ── Loading state ─────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton [loading]="loading">Click</button>`,
})
class LoadingButtonFixture {
  loading = false;
}

describe('NgAtomsButtonDirective — loading', () => {
  it('injects spinner as first child when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    const firstChild = btn.firstChild as HTMLElement;
    expect(firstChild?.classList.contains('nga-btn-spinner')).toBe(true);
  });

  it('sets aria-busy="true" when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('sets aria-disabled="true" when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });

  it('adds nga-btn--loading class when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--loading')).toBe(true);
  });

  it('removes spinner when loading returns to false', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.querySelector('.nga-btn-spinner')).toBeNull();
  });

  it('removes aria-busy when loading returns to false', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.hasAttribute('aria-busy')).toBe(false);
  });

  it('removes nga-btn--loading class when loading returns to false', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--loading')).toBe(false);
  });

  it('does not set native disabled attribute when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.hasAttribute('disabled')).toBe(false);
  });

  it('stops click event propagation when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;

    let parentReceived = false;
    btn.parentElement!.addEventListener('click', () => { parentReceived = true; });
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(parentReceived).toBe(false);
  });

  it('does not double-inject spinner on rapid toggle', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.querySelectorAll('.nga-btn-spinner').length).toBe(1);
  });
});

// ── loading + native disabled interaction ─────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton disabled [loading]="loading">Click</button>`,
})
class LoadingWithDisabledFixture {
  loading = false;
}

describe('NgAtomsButtonDirective — loading + native disabled', () => {
  it('retains aria-disabled when loading=false and native disabled is present', () => {
    const fixture = createFixture(LoadingWithDisabledFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    // Native disabled is present — aria-disabled must NOT be removed
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });
});
