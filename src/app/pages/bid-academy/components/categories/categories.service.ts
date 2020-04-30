import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API call to get all Pathway's Categories... 
   */
  public getPathwayCategories() {
    return this.httpClient.get(`v2/admin/story_categories`);
  }

  /**
   * API server call to create Category...
   * @param params 
   */
  public createPathwayCategory(params) {
    return this.httpClient.post(`v2/admin/story_categories`, params)
  }

  /**
   * API server call to Update a Category...
   * @param params 
   * @param id 
   */
  public updatePathwayCategory(params, id) {
    return this.httpClient.patch(`v2/admin/story_categories/${id}`, params);
  }

  /**
   * API server call to delete a Category...
   * @param id 
   */
  public deletePathwayCategory(id) {
    return this.httpClient.delete(`v2/admin/story_categories/${id}`);
  }


}
