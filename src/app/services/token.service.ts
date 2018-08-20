import { Injectable, Inject } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class TokenService {

/*

    public accessToken = this.localStorage.retrieve('access_token') ? this.jwtHelper.decodeToken(this.localStorage.retrieve('access_token')) : '';
    public idToken = this.localStorage.retrieve('id_token') ? this.jwtHelper.decodeToken(this.localStorage.retrieve('id_token')) : '';
*/

    public accessToken = this.localStorage.retrieve('access_token');
    public idToken = this.localStorage.retrieve('id_token');

    constructor(
        private localStorage: LocalStorageService,
    ) {
    }

}
