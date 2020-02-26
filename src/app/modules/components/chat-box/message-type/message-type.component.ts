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
  public textMessageForm: FormGroup;

  constructor(
    public chatBoxService: ChatBoxService
  ) { }

  ngOnInit() {
    this.textMessageForm = new FormGroup({
      body: new FormControl('', [Validators.required])
    });
  }

  public createAssistanceComments(requestParams) {
    if (!requestParams) {
      let request: any = {
        body: this.textMessageForm.controls['body'].value,
        commentable_id: this.assistanceId,
        commentable_type: "Assistance"
      };

      requestParams = { assistance_comment: request }
    }
    this.chatBoxService.createAssistanceComments(this.assistanceId, requestParams).subscribe((res: any) => {
      res = JSON.parse(res);
      this.textMessageForm.controls['body'].setValue('');
    }, error => {
      console.error(error);
    });
  }


  /**
   * to Handle the selected file...
   * @param files
   */
  public handleFileInput(files: File) {
    const formData: FormData = new FormData();
    formData.append(`assistance_comment[attachments_attributes][][file]`, files[0]);
    formData.append('assistance_comment[commentable_id]', this.assistanceId.toString());
    formData.append('assistance_comment[commentable_type]', "Assistance");
    this.createAssistanceComments(formData);
  }
}
