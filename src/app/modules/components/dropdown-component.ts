
import { Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

export abstract class DropdownComponent {
  constructor(public el: ElementRef) { }

  @HostListener('window:click', ['$event.target'])
  private onWindowClick(target: HTMLElement): void {
    if (!this.el.nativeElement.contains(target)) this.show = false;
  }

  @Output() public onSelect: EventEmitter<string> = new EventEmitter();

  @Input() public items: any;

  public show: boolean = false;

  public select(itemKey: string): void {
    this.onSelect.emit(itemKey);
    this.show = false;
  }

  public toggle(): void {
    this.show = !this.show;
  }
}