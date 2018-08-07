import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';


import { LocalStorageService } from 'ngx-webstorage';
import { AuthConfirmService } from './auth-confirm.service';

import { AUTH_CONFIG, AuthorizationConfig } from '../authorization-config.module';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class LoginService {
    /*login*/
    private operationId: string;
    public token: string;
    public authErr: boolean;

    constructor(
        private router: Router,
        private http: HttpClient,
        private localStorage: LocalStorageService,
        private permissionsService: NgxPermissionsService,
        public authConfirmService: AuthConfirmService,
        @Inject(AUTH_CONFIG) private config: AuthorizationConfig
    ) {}

    public login(username: string, password: string): Observable<boolean> {

        const data = {
            grant_type: 'password',
            username: username,
            password: password
        };

        let url = this.config.apiLoginUrl;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded',
            })
        };

        return this.http.post(url, this.getFormUrlEncoded(data), httpOptions )
            .map((response: Response) => {
                /*one step*/
                if (!this.config.twoStepsAuthorization) {

                    //auth
                    // this.authConfirmService.setSessionData(response); to decode token and set user role

                    for (let key in response) {
                        this.localStorage.store(key, response[key]);
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
            })
            .catch((error: Response | any) => {
                // In a real world app, you might use a remote logging infrastructure
                let errMsg: string;
                if (error instanceof Response) {
                    /*const body = error.json() || '';
                    const err = body.error || JSON.stringify(body);
                    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;*/
                    // console.log('errMsg', error.json().code);
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                return Observable.throw(errMsg);
            });

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

    /*end login*/

    logout(): void {
        /*clear token remove user from local storage to log user out*/
        this.token = null;
        this.localStorage.clear();
        this.permissionsService.flushPermissions();
        this.router.navigate(['/login']);
    }
}
