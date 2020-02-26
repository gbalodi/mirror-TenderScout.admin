import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IChatMessage } from 'app/modules/interfaces/chat-message';
import { ScrollToBottomDirective } from 'app/directives/scroll-to-bottom.directive';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @ViewChild(ScrollToBottomDirective) scroll: ScrollToBottomDirective;
  @Input() public messages: Array<IChatMessage>;

  constructor() { }

  ngOnInit() {
  }

}
