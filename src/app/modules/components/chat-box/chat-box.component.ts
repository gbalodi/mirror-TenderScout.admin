import { Component, OnInit } from '@angular/core';
import { IChatMessage } from 'app/modules/interfaces/chat-message';
import { Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatBoxService } from './chat-box.service';
import { WebSocketService } from 'app/services/web-socket.service';

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

  constructor(
    private chatBoxService: ChatBoxService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.getChatResponse.subscribe(res => {
      if (res) {
        this.messages.push(res);
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

  public getAssistanceById() {
    this.chatBoxService.getAssistance(this.assistanceId).subscribe((res: any) => {
      res = JSON.parse(res);
      this.assistanceDetails = res;
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

  public getNewMessage(message) {
    this.messages.push(message);
  }

  public ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

}
