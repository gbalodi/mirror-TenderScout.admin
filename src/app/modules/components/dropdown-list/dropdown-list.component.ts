import { Component, Output, EventEmitter, Input, HostBinding, ViewChild, ElementRef, Inject } from '@angular/core';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: 'dropdown-list.component.html',
  styleUrls: ['dropdown-list.component.scss'],
  animations: [
    trigger('host', [
      transition('void => *', [
        animate(100, keyframes([
          style({ 'height': '0px', overflow: 'hidden', opacity: 0, offset: 0 }),
          style({ 'height': '*', overflow: 'hidden', opacity: 1, offset: 1 })
        ]))
      ]),
      transition('* => void', [
        animate(100, keyframes([
          style({ 'height': '*', overflow: 'hidden', offset: 0 }),
          style({ 'height': '0px', overflow: 'hidden', opacity: 0, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class DropdownListComponent {
  @HostBinding('@host') private hostAnimation: any;

  @Output() private onSelect: EventEmitter<string> = new EventEmitter();

  @Input() public items: { [key: string]: string };
  @Input() public myTabIndex: number = -1;
  @Input() public comeFrom: string ;
  @Input() public inputKey: string ;
  // public inputEl: any;
  @ViewChild("myInput") inputEl: ElementRef;
  public getObjectKeys: any;

  constructor(
    @Inject(DOCUMENT) private document: Document
    ) { }

  public select(key: string): void {
    this.onSelect.emit(key);
  }

  ngOnChanges(changes: any, index): void {
    if (changes.items && typeof changes.items.currentValue) {
      this.getObjectKeys = Object.keys(changes.items.currentValue)
    }
    if (this.inputEl && changes.myTabIndex && changes.myTabIndex.currentValue > -1) {
      this.inputEl.nativeElement.focus();
    }
  }

  ngOnChanges2(changes: any, index, itemKey): void {
    if (changes.keyCode && changes.keyCode === 38 && this.myTabIndex >= 0) {
      if (this.myTabIndex !== 0) {
        this.myTabIndex = this.myTabIndex - 1;
      }
    } else if (changes.keyCode && changes.keyCode === 40 && this.myTabIndex >= 0) {
      if (this.myTabIndex < Object.keys(this.items).length) {
        this.myTabIndex = this.myTabIndex + 1;
      }
    } else if (changes.keyCode && changes.keyCode === 13) {
      var key;
      if (parseInt(itemKey) > this.myTabIndex) {
        key = this.getObjectKeys[this.myTabIndex];
      } else {
        key = this.myTabIndex + 1;
        if (this.getObjectKeys) {
          key = this.getObjectKeys[this.myTabIndex];
        }
      }
      this.select(key.toString());
    }
    if(changes.keyCode === 27 || changes.keyCode === 9){
      this.comeFrom === 'select-component' ? this.select('4'): this.select(this.inputKey);
      // this.inputEl.nativeElement.requestFocus();
      // this.renderer.invokeElementMethod(changes.target, 'blur');
    }
    if(this.document.getElementById('index' + this.myTabIndex)){
      this.document.getElementById('index' + this.myTabIndex).focus();
    }
  }
}