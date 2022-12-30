import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[dropDown]',
})
export class DropdownDirective {
  constructor(private readonly _element: ElementRef) {}

  @HostListener('click', ['$event.target'])
  public onClick(target: any) {
    const menu = this._element.nativeElement?.querySelector('.dropdown-menu');

    if (menu) {
      menu.style.display =
        menu.style.display == 'none' || menu.style.display == ''
          ? 'block'
          : 'none';
    }
  }
}
