import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidAcademyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API server call to get all Story Boards...
   */
  public getAllStoryBoards() {
    return this.httpClient.get(`v2/admin/story_boards`);
  }

  /**
   * API server call to get a Story Board by Id... 
   * @param id 
   */
  public getStoryBoardById(id) {
    return this.httpClient.get(`v2/admin/story_boards/${id}`);
  }

  /**
   * API server call to create Story Board...
   * @param params 
   */
  public createStoryBoard(params) {
    return this.httpClient.post(`v2/admin/story_boards`, params);
  }

  /**
   * API server call to update a Story Board...
   * @param id 
   * @param params 
   */
  public updateStoryBoard(params, id) {
    return this.httpClient.patch(`v2/admin/story_boards/${id}`, params)
  }

  /**
   * API server call to delete a Story Board...
   * @param id 
   */
  public deleteStoryBoard(id) {
    return this.httpClient.delete(`v2/admin/story_boards/${id}`);
  }

  /**
   * API server call to get all Tags Labels...
   */
  public getAllTagLabels() {
    return this.httpClient.get(`v2/admin/story_boards/tags`);
  }
}
