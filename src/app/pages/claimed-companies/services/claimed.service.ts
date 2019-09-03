import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimedService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API server service call to get all claimed company's users with pagination...
   * @param page 
   */
  public getClaimsList(page) {
    return this.httpClient.get(`v2/marketplace/organizations/claims_list?page=${page}`);
  }

  /**
   * API server service call to claimed Approved...
   * @param claimId 
   * @param data 
   */
  public claimApproval(claimId, data) {
    return this.httpClient.post(`v2/marketplace/organizations/${claimId}/claim_approval`, data);
  }
}
