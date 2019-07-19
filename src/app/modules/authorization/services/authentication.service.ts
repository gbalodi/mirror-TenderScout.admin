import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { LocalStorageService } from 'ngx-webstorage';
import { AuthConfirmService } from './auth-confirm.service';
import { Router } from '@angular/router';
import { AUTH_CONFIG, AuthorizationConfig } from '../authorization-config.module';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
    export class AuthenticationService {

    public token: string;
    private postUrl = this.config.apiLoginUrl;
    private operationId: string;

    constructor(
          private http: HttpClient,
          private localStorage: LocalStorageService,
          private authConfirmService: AuthConfirmService,
          private permissionsService: NgxPermissionsService,
          private router: Router,
          @Inject(AUTH_CONFIG) private config: AuthorizationConfig
        ) {
        // set token if saved in local storage
        if(this.localStorage.retrieve('access_token')){
            this.token = this.localStorage.retrieve('access_token');
        }
    }

    getFormUrlEncoded(toConvert) {
        const formBody = [];
        for (const property in toConvert) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(toConvert[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    }

    public login(username: string, password: string): Observable<boolean> {

        const data = {
            grant_type: 'password',
            username: username,
            password: password
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded',
            })
        };

        return this.http.post( this.postUrl, this.getFormUrlEncoded(data) )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let resp = JSON.parse( response.toString() ),
                    token = resp.access_token;

                if (token) {
                    /*one step*/
                    if (!this.config.twoStepsAuthorization) {

                        //auth
                        // this.authConfirmService.setSessionData(response); to decode token and set user role

                        for (let key in resp) {
                            this.localStorage.store(key, resp[key]);
                        }

                        return true;
                    }
                    /*end one step*/

                    /*two steps*/
                    if (this.config.twoStepsAuthorization) {
                        /*login successful if there's a jwt token in the response*/
                        const operationId = response.json() && response.json().operationId;
                        if (operationId) {
                            this.authConfirmService.operationId = operationId;
                            this.authConfirmService.routeMethod = 'login';
                            return true;
                        } else {
                            /*return false to indicate failed login*/
                            return false;
                        }
                    }
                    /*end two steps*/
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });

    }

    logout(): void {
        this.token = null;
        this.localStorage.clear();
        this.permissionsService.flushPermissions();
        this.router.navigate(['/login']);
    }
}
