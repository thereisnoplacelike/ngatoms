// @ts-nocheck
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgAtomsInputDirective } from './input.directive';

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
  imports: [NgAtomsInputDirective],
  template: `<input ngAtomsInput />`,
})
class DefaultInputFixture {}

describe('NgAtomsInputDirective — defaults', () => {
  it('applies nga-input base class', () => {
    const fixture = createFixture(DefaultInputFixture);
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.classList.contains('nga-input')).toBe(true);
  });

  it('applies nga-input--default by default', () => {
    const fixture = createFixture(DefaultInputFixture);
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.classList.contains('nga-input--default')).toBe(true);
  });

  it('applies nga-input--md by default', () => {
    const fixture = createFixture(DefaultInputFixture);
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.classList.contains('nga-input--md')).toBe(true);
  });

  it('does not set aria-invalid by default', () => {
    const fixture = createFixture(DefaultInputFixture);
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.hasAttribute('aria-invalid')).toBe(false);
  });
});

// ── Variant classes ───────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsInputDirective],
  template: `<input ngAtomsInput [variant]="variant" />`,
})
class VariantInputFixture {
  variant: 'default' | 'filled' | 'ghost' = 'default';
}

describe('NgAtomsInputDirective — variant', () => {
  const variants = ['default', 'filled', 'ghost'] as const;

  for (const v of variants) {
    it(`applies nga-input--${v} when variant="${v}"`, () => {
      const fixture = createFixture(VariantInputFixture);
      fixture.componentInstance.variant = v;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
      expect(el.classList.contains(`nga-input--${v}`)).toBe(true);
    });
  }

  it('removes previous variant class when variant changes', () => {
    const fixture = createFixture(VariantInputFixture);
    fixture.componentInstance.variant = 'default';
    fixture.detectChanges();
    fixture.componentInstance.variant = 'filled';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.classList.contains('nga-input--default')).toBe(false);
    expect(el.classList.contains('nga-input--filled')).toBe(true);
  });
});

// ── Size classes ──────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsInputDirective],
  template: `<input ngAtomsInput [size]="size" />`,
})
class SizeInputFixture {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}

describe('NgAtomsInputDirective — size', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  for (const s of sizes) {
    it(`applies nga-input--${s} when size="${s}"`, () => {
      const fixture = createFixture(SizeInputFixture);
      fixture.componentInstance.size = s;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
      expect(el.classList.contains(`nga-input--${s}`)).toBe(true);
    });
  }

  it('removes previous size class when size changes', () => {
    const fixture = createFixture(SizeInputFixture);
    fixture.componentInstance.size = 'lg';
    fixture.detectChanges();
    fixture.componentInstance.size = 'xs';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.classList.contains('nga-input--lg')).toBe(false);
    expect(el.classList.contains('nga-input--xs')).toBe(true);
  });
});

// ── Invalid state ─────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsInputDirective],
  template: `<input ngAtomsInput [invalid]="invalid" />`,
})
class InvalidInputFixture {
  invalid = false;
}

describe('NgAtomsInputDirective — invalid', () => {
  it('adds nga-input--invalid class when invalid=true', () => {
    const fixture = createFixture(InvalidInputFixture);
    fixture.componentInstance.invalid = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.classList.contains('nga-input--invalid')).toBe(true);
  });

  it('sets aria-invalid="true" when invalid=true', () => {
    const fixture = createFixture(InvalidInputFixture);
    fixture.componentInstance.invalid = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.getAttribute('aria-invalid')).toBe('true');
  });

  it('removes nga-input--invalid class when invalid returns to false', () => {
    const fixture = createFixture(InvalidInputFixture);
    fixture.componentInstance.invalid = true;
    fixture.detectChanges();
    fixture.componentInstance.invalid = false;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.classList.contains('nga-input--invalid')).toBe(false);
  });

  it('removes aria-invalid when invalid returns to false', () => {
    const fixture = createFixture(InvalidInputFixture);
    fixture.componentInstance.invalid = true;
    fixture.detectChanges();
    fixture.componentInstance.invalid = false;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(NgAtomsInputDirective)).nativeElement;
    expect(el.hasAttribute('aria-invalid')).toBe(false);
  });
});
