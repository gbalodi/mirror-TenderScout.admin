import { Directive, HostListener, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appNavDropdown]'
})
export class NavDropdownDirective {

  constructor(
    private el: ElementRef
  ) { }

  toggle() {
    this.el.nativeElement.classList.toggle('open');
  }
}

/**
* Allows the dropdown to be toggled via click.
*/
@Directive({
  selector: '[appNavDropdownToggle]'
})
export class NavDropdownToggleDirective {
  constructor(
    private dropdown: NavDropdownDirective,
    @Inject(DOCUMENT) public document: Document | any
  ) { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    var els = this.document.querySelectorAll('.open')
    for (const li of this.document.querySelectorAll('li')) {
      li.classList.remove("open");
    }
    $event.preventDefault();
    this.dropdown.toggle();
  }
}

export const NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];
