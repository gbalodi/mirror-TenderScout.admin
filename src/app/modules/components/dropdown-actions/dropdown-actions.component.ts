import { Component, Input, Output, EventEmitter, HostListener, ElementRef, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dropdown-actions',
  templateUrl: './dropdown-actions.component.html',
  styleUrls: ['./dropdown-actions.component.scss'],
  host: {
    class: 'dropdown-actions'
  },
  animations: [
    trigger('dropdown', [
      transition('void => *', [
        animate(100, keyframes([
          style({ opacity: 0, offset: 0, transform: 'translateY(10%)' }),
          style({ opacity: 1, offset: 1, transform: 'translateY(0%)' })
        ]))
      ]),
      transition('* => void', [
        animate(100, keyframes([
          style({ opacity: 0, transform: 'translateY(40%)' })
        ]))
      ])])
  ]
})
export class DropdownActionsComponent {

  constructor(private el: ElementRef) { }

  @Output() onSelect: EventEmitter<string> = new EventEmitter();

  @HostListener('window:click', ['$event.target'])
  private onWindowClick(target: HTMLElement): void {
    if (!this.el.nativeElement.contains(target)) this.show = false;
  }

  @Input() public label: string;

  @Input() public actions: { [key: string]: string };
  @Input() public fileDownload: boolean = false;

  @Input() public disabled: boolean = false;
  @Input() public selectedItem: any;

  @HostBinding('class.show') public show: boolean = false;

  public toggle(): void {
    this.show = this.disabled ? false : !this.show;
  }

  public select(actionKey): void {
    this.onSelect.emit(actionKey);
    this.show = false;
  }

}
