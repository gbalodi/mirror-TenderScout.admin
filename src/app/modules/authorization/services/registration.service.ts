import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthConfirmService } from './auth-confirm.service';
import { AUTH_CONFIG, AuthorizationConfig } from '../authorization-config.module';

@Injectable()
export class RegistrationService {
    private authTarget: string;

    constructor(
        private http: HttpClient,
        public authConfirmService: AuthConfirmService,
        @Inject(AUTH_CONFIG) private config: AuthorizationConfig
    ) { }

    /*registration*/
        private operationId: string;

        public register(model: any): Observable<boolean> {

            const data = {
                username: model.username,
                password: model.password,
                passwordConfirm: model.passwordConfirm,
                checkLicense: model.checkLicense,
                phone: model.phone,
                generateToken: this.config.twoStepsRegistration ? true : false
            };

            return this.http.post(this.config.apiRegUrl, JSON.stringify(data))
                .map((response: Response) => {

                    /*one step*/
                    if (!this.config.twoStepsRegistration) {
                        //auth
                        this.authConfirmService.setSessionData(response);
                    }
                    /*end one step*/

                    /*two steps*/
                    if (this.config.twoStepsRegistration) {
                        /*login successful if there's a jwt token in the response*/
                        const operationId = response.json() && response.json().operationId;
                        if (operationId) {
                            // set operationId property
                            this.authConfirmService.operationId = operationId;
                            this.authConfirmService.routeMethod = 'registration';
                            // return true to indicate successful reg
                            return true;
                        } else {
                            // return false to indicate failed reg
                            return false;
                        }
                    }
                    /*end two steps*/

                });
        }
    /*end registration*/
}
