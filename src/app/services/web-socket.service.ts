import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
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
  public changeDetectResponse: BehaviorSubject<string> = new BehaviorSubject(null);
  private assistRequestSocket$: WebSocketSubject<any>;
  public assistRequestStream$: Observable<ISocketRes>;

  constructor(
    private tokenService: TokenService
  ) { }

  private chatSocket$: WebSocketSubject<any>;
  public chatStream$: Observable<ISocketRes>;
  private chatExportSub: Subscription;
  private assistRequestExportSub: Subscription;

  public callChatStream(assistanceId) {
    this.assistanceId = assistanceId;
    this.chatStream$ = this.socket('chatSocket$');
  }

  public callAssistRequestStream() {
    this.assistRequestSocket$ = new WebSocketSubject(environment.socket + `cable/AdminAssistanceRequestChannel?token=${this.tokenService.accessToken}`);
    this.assistRequestStream$ = this.socket('assistRequestSocket$');
  }

  public socket(type) {
    if (type !== 'socket$' && type !== "assistRequestSocket$")
      this.chatSocket$ = new WebSocketSubject(environment.socket + `cable/AssistanceCommentChannel?token=${this.tokenService.accessToken}&assistance_id=${this.assistanceId}`);
    return this[type].pipe(
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

  public setAssistRequestSubscription(): void {
    this.assistRequestSocket$.next(
      {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'AdminAssistanceRequestChannel',
          token: this.tokenService.accessToken,

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
      });
  }

  public assistRequestSubscribe(): void {
    this.assistRequestExportSub = this.assistRequestStream$
      .pipe(
        filter((data: ISocketRes) => {
          return data.identifier &&
            (<{ channel: string }>data.identifier).channel === 'AdminAssistanceRequestChannel' &&
            data.message ? true : false
        })
      ).subscribe((data: ISocketRes) => {
        console.log(data);
        if (data.message === "CHANGE_DETECTED") {
          this.changeDetectResponse.next('CHANGE_DETECTED')
        }
        // location.href = data.message;
      });
  }

  public unsubscribe(): void {
    if (this.chatExportSub)
      this.chatExportUnsubscribe();

    if (this.assistRequestExportSub)
      this.assistRequestExportUnsubscribe()
  }

  public chatExportUnsubscribe() {
    this.chatExportSub.unsubscribe();
  }

  public assistRequestExportUnsubscribe() {
    this.assistRequestExportSub.unsubscribe();
  }

}