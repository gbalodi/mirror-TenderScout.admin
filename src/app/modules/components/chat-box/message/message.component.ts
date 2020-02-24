import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from 'app/modules/interfaces/chat-message';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() public messages: Array<IChatMessage>;

  constructor() { }

  ngOnInit() {
  }

}
