import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API call to upload csv or xls file under 20MB...
   * @param formData 
   */
  public importCSV_XLS(formData) {
    return this.httpClient.post('v1/perform/performance_histories/import', formData);
  }

  /**
   * API server call to Orbidal Documents for bid hub...
   * @param formData 
   */
  public uploadOrbidalDocuments(formData) {
    return this.httpClient.post('v1/bid_library/orbidal_documents', formData);
  }
}
