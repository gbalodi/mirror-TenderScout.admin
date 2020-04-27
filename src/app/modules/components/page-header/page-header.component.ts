import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IButton } from 'app/model/headerButton.interface';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Output() public openModal: EventEmitter<any> = new EventEmitter(null);
  @Input() public headerName: string;
  @Input() public buttons: IButton;

  constructor() { }

  ngOnInit() { }

  public clicked(button) {
    if (button.usePurpose === 'modal') {
      this._openModelEmitter(button);
    }
  }

  private _openModelEmitter(button) {
    this.openModal.emit(button.params);
  }

}
