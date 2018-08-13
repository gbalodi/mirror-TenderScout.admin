import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MainRequestService {

    constructor(private http: HttpClient) {
    }

    public postData(url: string, data: object): Observable<any> {
        return this.http.post(url, data);
    }

    public getData(url: string): Observable<any> {
        return this.http.get(url);
    }

    public daleteData(url: string): Observable<any> {
        return this.http.delete(url);
    }

    public putData(url: string, data: object): Observable<any> {
        return this.http.put(url, data);
    }

}
