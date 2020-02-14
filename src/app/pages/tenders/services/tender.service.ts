import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  constructor(
    public httpClient: HttpClient
  ) { }

  /**
   * API server call to get a tender details by tender id...
   * @param tenderId 
   */
  public getTenderDetails(tenderId) {
    return this.httpClient.get(`v1/marketplace/tenders/${tenderId}`)
  }
}
