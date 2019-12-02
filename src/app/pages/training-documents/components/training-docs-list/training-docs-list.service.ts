import { Injectable } from '@angular/core';
import { FileTypeImage } from '../../../../global.config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingDocsListService {
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API Server call to upload Training Documents...
   * @param data 
   */
  public trainingDocumentsUpload(data) {
    return this.httpClient.post(`v2/admin/training_documents`, data);
  }

  /**
   * API server call to get all Training Documents list...
   */
  public getTrainingDocumentsListing() {
    return this.httpClient.get(`v2/admin/training_documents`)
      .pipe(map(data => this.modifyUploadedFiles(data)));
  }

  /**
   * API server to Exclude users to prevent documents to show them...
   * @param data 
   */
  public trainingDocumentsExcludeUsers(data) {
    return this.httpClient.post(`v1/bid_library/training_documents/exclude_users`, data);
  }

  /**
   * API server call to exclude users... 
   * @param data 
   */
  public excludeUsers(data) {
    return this.httpClient.post(`v1/bid_library/training_documents/exclude_users`, data);
  }

  /**
   * API server call to get Excluded users...
   */
  public getExcludedUsers() {
    return this.httpClient.get(`v1/bid_library/training_documents/excluded_users`);
  }

  /**
   * API Server call to delete Training Documents...
   * @param id 
   */
  public deleteDocumentsById(id) {
    return this.httpClient.delete(`v2/admin/training_documents/${id}`);
  }

  /**
   * Add images path according to it's type...
   * @param res 
   */
  public modifyUploadedFiles(res: any) {
    res = JSON.parse(res);
    res.map((obj) => {
      obj.img = FileTypeImage.getFileTypeImage(obj.file_name);
    });
    return res;
  }
}
