import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InjestorsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API server service call to get Injestors details with pagination...
   * @param page 
   */
  public getIngestorDetails(page) {
    return this.httpClient.get(`v2/admin/ingestor_details?page=${page}`);
  }
}
