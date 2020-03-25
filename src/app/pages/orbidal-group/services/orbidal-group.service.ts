import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrbidalGroupService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * API server call to get all created groups...
   */
  public getOrbidalGroups() {
    return this.httpClient.get(`v2/admin/orbidal_groups`);
  }

  /**
   * API server call to create new Group...
   * @param criteria 
   */
  public createOrbidalGroups(criteria, noNeed) {
    return this.httpClient.post(`v2/admin/orbidal_groups`, criteria);
  }

  /**
   * API server call to delete Created ORB Group...
   * @param groupId 
   */
  public deleteOrbidalGroups(groupId) {
    return this.httpClient.delete(`v2/admin/orbidal_groups/${groupId}`);
  }

  public updateOrbidalGroups(criteria, groupId) {
    return this.httpClient.patch(`v2/admin/orbidal_groups/${groupId}`, criteria);
  }

  /**
   * API server call to include company(s) in a ORB Group...
   * @param groupId 
   * @param criteria 
   */
  public includeCompaniesORBGroup(groupId, criteria) {
    return this.httpClient.post(`v2/admin/orbidal_groups/${groupId}/include_companies`, criteria);
  }

  /**
   * API server call to get all companies list...
   */
  public getCompaniesList() {
    return this.httpClient.get(`v2/admin/companies_list`);
  }

  public getOrbidalGroupDetails(groupId) {
    return this.httpClient.get(`v2/admin/orbidal_groups/${groupId}`);
  }
}
