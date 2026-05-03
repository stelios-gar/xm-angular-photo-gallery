/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Directive({
  selector: '[routerLink]'
})
class RouterLinkStubDirective {
  @Input('routerLink') routerLink: string | unknown[] = '';
}

@Directive({
  selector: '[routerLinkActive]'
})
class RouterLinkActiveStubDirective {
  @Input('routerLinkActive') routerLinkActive: string | string[] = '';
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      declarations: [
        HeaderComponent,
        RouterLinkStubDirective,
        RouterLinkActiveStubDirective
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleButton = compiled.querySelector('.app-title');

    expect(titleButton).toBeTruthy();
    expect(titleButton?.textContent?.trim()).toBe('Photo Gallery');
  });

  it('should render navigation buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));

    expect(buttons.some(button => button.textContent?.trim() === 'Photos')).toBeTrue();
    expect(buttons.some(button => button.textContent?.trim() === 'Favorites')).toBeTrue();
  });
});