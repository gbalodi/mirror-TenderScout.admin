import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {
  constructor(
    public httpClient: HttpClient
  ) { }

  /**
   * API server call to get all Assistance comments by selected assistance ID...
   * @param assistanceId 
   */
  public getAssistanceComments(assistanceId) {
    return this.httpClient.get(`v2/assistances/${assistanceId}/request_comments`);
  }

  /**
   * API server call to send assistance comments for the support... 
   * @param assistanceId 
   * @param data 
   */
  public createAssistanceComments(assistanceId, data) {
    return this.httpClient.post(`v2/assistances/${assistanceId}/assistance_comments/reply_to_assistance`, data);
  }
}
