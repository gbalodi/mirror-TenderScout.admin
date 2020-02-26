import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
// import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { environment } from 'environments/environment';

interface ISocketRes {
  type?: string;
  identifier?: string | {
    channel: string;
    token: string;
  };
  message: string;
}

@Injectable()
export class WebSocketService {
  public assistanceId: number;
  public getChatResponse: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private tokenService: TokenService
  ) { }

  private chatSocket$: WebSocketSubject<any>;
  public chatStream$: Observable<ISocketRes>;
  private chatExportSub: Subscription;

  public callChatStream(assistanceId) {
    this.assistanceId = assistanceId;
    this.chatStream$ = this.socket('chatSocket$');
  }

  public socket(type) {
    this.chatSocket$ = new WebSocketSubject(environment.socket + `cable/AssistanceCommentChannel?token=${this.tokenService.accessToken}&assistance_id=${this.assistanceId}`);
    return this.chatSocket$.pipe(
      map(
        (res: ISocketRes) => {
          if (res.identifier) res.identifier = JSON.parse(<string>res.identifier);
          return res;
        }
      )
    )
  }

  /**
   * Set Chat Subscription for Assistance Comments Channel...
   */
  public setChatSubscription(): void {
    this.chatSocket$.next(
      {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'AssistanceCommentChannel',
          token: this.tokenService.accessToken,
          assistance_id: this.assistanceId
        })
      }
    )
  }

  /**
   * Subscribe to get Assistance Comment Channel chat...
   */
  public chatSubscribe(): void {
    this.chatExportSub = this.chatStream$
      .pipe(
        filter((data: ISocketRes) => {
          return data.identifier &&
            (<{ channel: string }>data.identifier).channel === 'AssistanceCommentChannel' &&
            data.message ? true : false
        })
      ).subscribe((data: ISocketRes) => {
        console.log(data);
        this.getChatResponse.next(data.message);
        // location.href = data.message;
      });
  }

  public unsubscribe(): void {
    if (this.chatExportSub)
      this.chatExportUnsubscribe();
  }

  public chatExportUnsubscribe() {
    this.chatExportSub.unsubscribe();
  }

}