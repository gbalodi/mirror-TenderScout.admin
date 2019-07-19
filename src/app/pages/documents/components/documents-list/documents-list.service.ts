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
  public getTrbidalDocumentsListing() {
    return this.httpClient.get(`v1/bid_library/orbidal_documents/documents_listing`);
  }

  /**
   * API server to Exclude users to prevent documents to show them...
   * @param data 
   */
  public orbidalDocumentsExcludeUsers(data) {
    return this.httpClient.post(`v1/bid_library/orbidal_documents/exclude_users`, data);
  }

}
