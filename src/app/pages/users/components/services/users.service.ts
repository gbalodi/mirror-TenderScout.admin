import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  public getUpgradeList;
  public getUpgradeRequests(): Observable<any> {
    return this.http.get('v1/users/upgrade_requests').pipe(
      map((requests: any) => {
        requests = JSON.parse(requests).filter(item => !item.upgraded_at);

        return requests.map((request: any) => {
          request.user['req_id'] = request.id;
          request.user['created_at'] = request.created_at;
          request.user['upgraded_at'] = request.upgraded_at;

          return request.user;
        });
      })
    )
  }

  /**
   * API server service call to get a User session...
   * @param id 
   */
  public getUserSessions(id, param) {
    return this.http.get(`v1/users/${id}/user_sessions?days=${param}`);
  }

  /**
   * Get Users Statistics with pagination & filter...
   * @param days 
   * @param page 
   */
  public getUserStatistics(data: any) {
    return this.http.post(`v1/users/user_statistics`, data);
  }

  /**
   * API server service call to get criteria wise Export Statistics of users...
   * @param data 
   */
  public getExportStatistics(data) {
    return this.http.post(`v1/users/export_statistics`, data);
  }

  /**
   * API server service call to get all requested for Admin rating with filter criteria... 
   * @param data 
   */
  public getAdminRatingRequests(data: { search_text: string, page: string }) {
    return this.http.get(`v1/bid_library/repositories/admin_rating_requests?search_text=${data.search_text}&page=${data.page}`);
  }

  /**
   * API server service call to set Rating for the user Document...
   * @param repository_slug 
   * @param id 
   * @param data 
   */
  public setAdminRating(repository_slug, id, data) {
    return this.http.put(`v1/bid_library/repositories/${repository_slug}/bid_assets/${id}`, data);
  }

  /**
   * API server service call to set/withdraw Archive a user...
   * @param userId 
   * @param data 
   */
  public archiveUser(userId, data) {
    return this.http.put(`v1/users/${userId}`, data)
  }

  /**
   * I server service call to get all Users Archive list
   */
  public getArchiveUsers() {
    return this.http.get(`v2/users/archived_users`);
  }
}
