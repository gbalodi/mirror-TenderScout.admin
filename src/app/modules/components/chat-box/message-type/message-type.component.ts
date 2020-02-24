import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChatMessage } from 'app/modules/interfaces/chat-message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatBoxService } from '../chat-box.service';

@Component({
  selector: 'message-type',
  templateUrl: './message-type.component.html',
  styleUrls: ['./message-type.component.scss']
})
export class MessageTypeComponent implements OnInit {
  @Input() public assistanceId: number;
  @Output() public passMessage: EventEmitter<IChatMessage> = new EventEmitter();
  public textMessageForm: FormGroup;

  constructor(
    public chatBoxService: ChatBoxService
  ) { }

  ngOnInit() {
    this.textMessageForm = new FormGroup({
      body: new FormControl('', [Validators.required])
    });
  }

  public createAssistanceComments() {
    let request: any = {
      body: this.textMessageForm.controls['body'].value,
      commentable_id: this.assistanceId,
      commentable_type: "Assistance"
      // "attachment_attributes":
      //   [{ "file": "file_name" }]
    }
    this.chatBoxService.createAssistanceComments(this.assistanceId, { assistance_comment: request }).subscribe((res: any) => {
      res = JSON.parse(res);
      this.textMessageForm.controls['body'].setValue('');
      this.passMessage.emit(res);
    }, error => {
      console.error(error);
    });


  }
}
