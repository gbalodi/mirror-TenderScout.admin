import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {
  constructor(
    public httpClient: HttpClient
  ) { }

  public messageLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

  /**
   * API service call to get Assistance request details...
   * @param id 
   */
  public getAssistance(id) {
    return this.httpClient.get(`v2/assistances/${id}/show_details`);
  }

  public closeAssistance(id, data) {
    return this.httpClient.patch(`v2/assistances/${id}`, data);
  }

  /**
   * API server call to deduct credits limits for the assistance request...
   * @param assistId 
   */
  public deductCredit(assistId) {
    return this.httpClient.patch(`v2/assistances/${assistId}/deduct_credit`, {});
  }
}
