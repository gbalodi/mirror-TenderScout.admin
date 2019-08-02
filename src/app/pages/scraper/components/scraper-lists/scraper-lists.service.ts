import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScraperListsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getScrappers() {
    return this.httpClient.get(`v1/scrappers`);
  }
}
