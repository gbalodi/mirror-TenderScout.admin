import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API server call to get all Stories (Groups)...
   */
  public getAllStories() {
    return this.httpClient.get(`v2/admin/stories`);
  }
}
