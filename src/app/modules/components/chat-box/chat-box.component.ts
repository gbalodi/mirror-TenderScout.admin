import { Component, OnInit } from '@angular/core';
import { IChatMessage } from 'app/modules/interfaces/chat-message';
import { Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatBoxService } from './chat-box.service';
import { WebSocketService } from 'app/services/web-socket.service';
import * as _ from "lodash"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  providers: [WebSocketService]
})
export class ChatBoxComponent implements OnInit {
  public assistanceDetails: any;
  public assistanceId: number;
  public messages: Array<IChatMessage> = [];
  public closeSubject: Subject<any> = new Subject();
  public Object: any = Object;
  public actions: { [key: string]: string } = {};
  public toggle: boolean = false;

  constructor(
    private chatBoxService: ChatBoxService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private webSocketService: WebSocketService,
    private toastrService: ToastrService
  ) {
    this.webSocketService.getChatResponse.subscribe(res => {
      if (res) {
        this.messages.push(res);
        this.updateAssistances();
      }
    });
  }

  private routerSub: Subscription = this.router.events.subscribe(() => this.closeSubject.next())

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params.id) {
        this.assistanceId = +params.id;
        this.webSocketService.callChatStream(this.assistanceId);
        this.getAssistanceById();
        this.getAssistanceComments();
        this.webSocketService.setChatSubscription();
        this.webSocketService.chatSubscribe();
      }
    });
  }

  public updateAssistances() {
    if (this.assistanceId) {
      this.chatBoxService.updateAssistances(this.assistanceId, {}).subscribe((res: any) => {
        res;
      }, error => {
        console.error(error);
      });
    }
  }

  public getAssistanceById() {
    this.chatBoxService.getAssistance(this.assistanceId).subscribe((res: any) => {
      res = JSON.parse(res);
      this.assistanceDetails = res;

      if (!this.assistanceDetails.read) {
        this.updateAssistances();
      }
      //  Set to Download/Attached files in the chat box...
      if (this.assistanceDetails.assistance_assets) {
        this.assistanceDetails.assistance_assets.forEach(element => {
          this.actions[element.file_name] = element.file_name;
        });
      }
    }, error => {
      console.error(error);
    });
  }

  public getAssistanceComments() {
    this.chatBoxService.getAssistanceComments(this.assistanceId).subscribe((res: any) => {
      res = JSON.parse(res);
      this.messages = res;
    }, error => {
      console.error(error);
    });
  }

  public ngOnDestroy(): void {
    this.webSocketService.chatExportUnsubscribe();
    this.routerSub.unsubscribe();
  }

  /**
 * To Download Attached file...
 * @param file 
 */
  public downloadFile(file) {
    let found = _.find(this.assistanceDetails.assistance_assets, ['file_name', file]);
    window.open(found.file_url, '_blank');
  }


  /**
   * API server call to deduct Credits limits by one of the user...
   */
  public deductCredit() {
    if (this.assistanceDetails.credits_count > 0) {
      this.chatBoxService.deductCredit(this.assistanceDetails.id).subscribe((res: any) => {
        res = JSON.parse(res);
        this.toastrService.success(`${res.success}`, "Success");
        this.getAssistanceById();
      }, error => {
        console.error(error);
      });
    } else {
      this.toastrService.warning('User has no available credits for deduction', 'Warning');
    }
  }

}
