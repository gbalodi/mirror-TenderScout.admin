import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { LocalStorageService } from 'ngx-webstorage';

import { AUTH_CONFIG, AuthorizationConfig } from '../authorization-config.module';
import { NgxPermissionsService } from 'ngx-permissions';
import { TokenService } from '../../../services/token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthConfirmService {
    public operationId:string;
    public routeMethod: string;

    /*confirm*/
        private postUrl;

        constructor(
            private http: HttpClient,
            private localStorage: LocalStorageService,
            private permissionsService: NgxPermissionsService,
            private tokenService: TokenService,
            private toasterService: ToastrService,
            @Inject(AUTH_CONFIG) private config: AuthorizationConfig
        ) { }

        public confirm(confirmData: any): Observable<boolean> {
            const data = {
                operationId: this.operationId,
                operationValue: confirmData.operationValue
            };

            if (this.routeMethod == 'login') {
                this.postUrl = this.config.apiLoginConfirmUrl;
            } else if (this.routeMethod == 'registration') {
                this.postUrl = this.config.apiRegConfirmUrl;
            }

            return this.http.post(this.postUrl, JSON.stringify(data))
                .map((response: Response) => {
                    // registration successful if there's a code=201
                    // const code = response.json() && response.json().code;
                    // if (code) {
                        this.setSessionData(response);
                        // return true to indicate successful registration
                        return true;
                    // } else {
                        // return false to indicate failed login
                        // return false;
                    // }
                });
        }
    /*end confirm*/

    /*authorization finish*/
        setSessionData(authData: any) {
            let token = authData.json().token,
                // access_token = this.tokenService.jwtHelper.decodeToken(token.access_token);
                access_token = token.access_token;

            /*check for access_token*/
            if (token.access_token) {

                /*check where user want to login*/

                    for (let key in token) {
                        this.localStorage.store(key, token[key]);
                    }

                    //setPermissions
                    if(access_token.realm_access){
                        this.permissionsService.loadPermissions( access_token.realm_access.roles );
                    }

                    /*return true to indicate successful login*/
                    return true;


            } else {
              return false;
            }

        }
    /*end authorization finish*/

}
