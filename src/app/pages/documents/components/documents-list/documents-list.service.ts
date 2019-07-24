import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    return this.httpClient.get(`v1/bid_library/orbidal_documents/documents_listing`)
    .pipe(map(data => this.modifyUploadedFiles(data)));
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

  /**
   * API Server call to delete Orbidal Documents...
   * @param id 
   */
  public deleteOrbidalDocumentsById(id) {
    return this.httpClient.delete(`v1/bid_library/orbidal_documents/${id}`);
  }

  /**
   * Add images path according to it's type...
   * @param res 
   */
  public modifyUploadedFiles(res: any) {
    res = JSON.parse(res);
    res.map((obj) => {
      var fileType = obj.file_name.split('.')[obj.file_name.split('.').length - 1].toLowerCase();

      switch (fileType) {
        case "pdf": {
          obj.img = 'assets/img/pdf-icon.png';
          return obj;
        }
        case "png": {
          obj.img = 'assets/img/png-icon.png';
          return obj;
        }
        case "jpg": {
          obj.img = 'assets/img/jpg-icon.png';
          return obj;
        }
        case "jpeg": {
          obj.img = 'assets/img/jpeg-icon.png';
          return obj;
        }
        case "doc": {
          obj.img = 'assets/img/word-icon.png';
          return obj;
        }
        case "docx": {
          obj.img = 'assets/img/docx-icon.png';
          return obj;
        }
        case "csv": {
          obj.img = 'assets/img/csv-icon.png';
          return obj;
        }
        case "xls": {
          obj.img = 'assets/img/xls-icon.png';
          return obj;
        }
        case "xlsx": {
          obj.img = 'assets/img/xlsx-icon.png';
          return obj;
        }
        case "pptx": {
          obj.img = 'assets/img/pptx-icon.png';
          return obj;
        }
        case "ppt": {
          obj.img = 'assets/img/ppt-icon.png';
          return obj;
        }
        default: {
          obj.img = 'assets/img/default-icon.png';
          return obj;
        }
      }
    });
    return res;
  }

}
