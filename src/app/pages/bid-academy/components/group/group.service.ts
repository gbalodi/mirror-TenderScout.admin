import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API server call to get a Story Group by id...
   * @param id 
   */
  public getStoriesById(id) {
    return this.httpClient.get(`v2/admin/stories/${id}`);
  }

  /**
   * API server call to get all Stories (Groups)...
   */
  public getAllStories() {
    return this.httpClient.get(`v2/admin/stories`);
  }

  /**
   * API server call to create a Story Group...
   * @param params 
   */
  public createStories(params) {
    return this.httpClient.post(`v2/admin/stories`, params);
  }

  /**
   * API server call to Update a story Group...
   * @param params 
   * @param id 
   */
  public updateStories(params, id) {
    return this.httpClient.patch(`v2/admin/stories/${id}`, params);
  }

  /**
   * API server call to delete a Story Group...
   * @param id 
   */
  public deleteStories(id) {
    return this.httpClient.delete(`v2/admin/stories/${id}`);
  }

  /**
   * API server call to Archive Group by id...
   * @param id 
   */
  public archiveStory(id, params) {
    return this.httpClient.patch(`v2/admin/stories/${id}/archive_story`, params);
  }

  /**
   * API server call to include users according to selected Story Groups...
   * @param params 
   */
  public includeUsers(params) {
    return this.httpClient.post(`v2/admin/stories/include_users`, params);
  }

  /**
   * API server call to get Users of a Story Group...
   * @param id 
   */
  public getStoryUsers(id) {
    return this.httpClient.get(`v2/admin/stories/${id}/story_users`);
  }

  /**
   * API server call to delete a Group 
   * @param groupId 
   * @param storyUserId 
   */
  public deleteStoryUser(groupId, storyUserId) {
    return this.httpClient.delete(`v2/admin/stories/${groupId}/delete_story_user/${storyUserId}`);
  }

  /**
   * API server call to get Sectors with there pathways...
   */
  public getSectorsTreeListing() {
    return this.httpClient.get(`${environment.apiUrl}v2/admin/stories/group_tree_listing`);
  }
}
