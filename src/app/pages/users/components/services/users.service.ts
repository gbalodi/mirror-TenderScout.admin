import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(
      private http: HttpClient
    ) { }

    public getUpgradeList;
    public getUpgradeRequests(): Observable<any> {
          return this.http.get('v1/users/upgrade_requests').pipe(
              map( ( requests: any ) => {
                  requests = JSON.parse(requests).filter(item => !item.upgraded_at);

                  return requests.map( (request:any) => {
                      request.user['req_id'] = request.id;
                      request.user['created_at'] = request.created_at;
                      request.user['upgraded_at'] = request.upgraded_at;

                      return request.user;
                  });
              })
          )
    }
}
