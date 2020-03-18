import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MainRequestService {

    constructor(private http: HttpClient) { }

    public postData(url: string, data: object): Observable<any> {
        return this.http.post(url, data);
    }

    public getData(url: string): Observable<any> {
        return this.http.get(url);
    }


    /**
     * API request to get data...
     * @param url 
     * @param params | Using HttpParams... 
     */
    public getDataWithParams(url: string, params): Observable<any> {
        return this.http.get(url, { params });
    }

    public getUsers(url: string, params): Observable<any> {
        return this.http.get(url, { params: params });
    }

    public daleteData(url: string): Observable<any> {
        return this.http.delete(url);
    }

    public putData(url: string, data: object): Observable<any> {
        return this.http.put(url, data);
    }

    public patchData(url: string, data: object): Observable<any> {
        return this.http.patch(url, data);
    }

    /**
     * API call to get Specific user data by it's Id...
     * @param userId 
     */
    public getSpecificUserData(userId) {
        return this.http.get('v1/users/' + userId);
    }

    /**
     * API call to delete User by Id...
     * @param userId 
     */
    public deleteUserById(userId) {
        return this.http.delete('v1/users/' + userId);
    }

    /**
     * API call to reset selected user Password... 
     * @param data 
     */
    public updateUserPassword(data) {
        return this.http.put('v1/users/' + data.userId + '/update_user_password', data);
    }

}
