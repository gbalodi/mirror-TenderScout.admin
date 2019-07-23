import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsListService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API Server call to upload Orbidal Documents...
   * @param data 
   */
  public orbidalDocumentsUpload(data) {
    return this.httpClient.post(`v1/bid_library/orbidal_documents/upload_documents`, data);
  }

  /**
   * API server call to get all Orbidal Documents list...
   */
  public getOrbidalDocumentsListing() {
    return this.httpClient.get(`v1/bid_library/orbidal_documents/documents_listing`);
  }

  /**
   * API server to Exclude users to prevent documents to show them...
   * @param data 
   */
  public orbidalDocumentsExcludeUsers(data) {
    return this.httpClient.post(`v1/bid_library/orbidal_documents/exclude_users`, data);
  }

  /**
   * API Server call to get all users...
   */
  public getUsersInfo() {
    return this.httpClient.get(`v1/users/users_info`);
  }

  /**
   * API server call to exclude users... 
   * @param data 
   */
  public excludeUsers(data) {
    return this.httpClient.post(`v1/bid_library/orbidal_documents/exclude_users`, data);
  }

  /**
   * API server call to get Excluded users...
   */
  public getExcludedUsers() {
    return this.httpClient.get(`v1/bid_library/orbidal_documents/excluded_users`);
  }

  public deleteOrbidalDocumentsById(id) {
    return this.httpClient.delete(`v1/bid_library/orbidal_documents/${id}`);
  }

}
