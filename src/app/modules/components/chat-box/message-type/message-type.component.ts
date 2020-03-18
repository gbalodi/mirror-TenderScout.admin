import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatBoxService } from '../chat-box.service';

@Component({
  selector: 'message-type',
  templateUrl: './message-type.component.html',
  styleUrls: ['./message-type.component.scss']
})
export class MessageTypeComponent implements OnInit {
  // @Input() public assistanceId: number;
  public textMessageForm: FormGroup;
  @Input() public assistanceDetails: any;

  constructor(
    public chatBoxService: ChatBoxService
  ) { }

  ngOnInit() {
    this.textMessageForm = new FormGroup({
      body: new FormControl('', [Validators.required])
    });

    // this.getAssistanceById();
  }

  // public getAssistanceById() {
  //   this.chatBoxService.getAssistance(this.assistanceId).subscribe((res: any) => {
  //     res = JSON.parse(res);
  //     this.assistanceDetails = res;
  //   }, error => {
  //     console.error(error);
  //   });
  // }

  public createAssistanceComments(requestParams, event) {
    let valid: boolean = true;
    if (event) {
      // Check Whether the written text it empty or Not...
      let found = this.textMessageForm.controls['body'].value.replace(/[^a-z0-9]/gi, '');
      if (!found) {
        valid = false;
      }
    }
    if (valid && !requestParams && this.textMessageForm.valid) {
      let request: any = {
        body: this.textMessageForm.controls['body'].value,
        commentable_id: this.assistanceDetails.id,
        commentable_type: "Assistance"
      };

      requestParams = { assistance_comment: request }
    }
    if (valid && requestParams) {
      this.chatBoxService.createAssistanceComments(this.assistanceDetails.id, requestParams).subscribe((res: any) => {
        res = JSON.parse(res);
        this.textMessageForm.controls['body'].setValue('');
      }, error => {
        console.error(error);
      });
    }
  }


  /**
   * to Handle the selected file...
   * @param files
   */
  public handleFileInput(files: File) {
    const formData: FormData = new FormData();
    formData.append(`assistance_comment[attachments_attributes][][file]`, files[0]);
    formData.append('assistance_comment[commentable_id]', this.assistanceDetails.id.toString());
    formData.append('assistance_comment[commentable_type]', "Assistance");
    this.createAssistanceComments(formData, undefined);
  }

  public closeAssistance() {
    this.chatBoxService.closeAssistance(this.assistanceDetails.id, { assistance: { status: 'closed' } }).subscribe((res: any) => {
      res = JSON.parse(res);
      this.assistanceDetails = res;
    }, error => {
      console.error(error);
    });
  }
}
