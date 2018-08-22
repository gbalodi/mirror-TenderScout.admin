import {Injectable} from '@angular/core';
import {Http, Headers, Response, HttpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import { LocalStorageService } from 'ngx-webstorage';
import { AuthConfirmService } from './auth-confirm.service';

@Injectable()
export class AuthenticationService {

    public token: string;
    private postUrl = '/auth';

    constructor(
          private http: HttpClient,
          private localStorage: LocalStorageService,
          private authConfirmService: AuthConfirmService
        ) {
        // set token if saved in local storage
        const currentUser = JSON.parse(this.localStorage.retrieve('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    public login(username: string, password: string): Observable<boolean> {

        const data = {
            username: username,
            password: password
        };

        return this.http.post(this.postUrl, JSON.stringify(data))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt tokens in session storage to keep user logged in between page refreshes
                    // this.localStorage.store('currentUser', JSON.stringify({username: username, token: token.access_token}));

                    this.authConfirmService.setSessionData(response);

                    // this.localStorage.store('currentUser', JSON.stringify(username));
                    // this.localStorage.store('access_token', JSON.stringify(token.access_token));
                    // this.localStorage.store('id_token', JSON.stringify(token.id_token));
                    // this.localStorage.store('refresh_token', JSON.stringify(token.refresh_token));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        // this.localStorage.clear('currentUser');
        this.localStorage.clear();
    }
}
