import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private localStorage: LocalStorageService,
        public auth: AuthService
    ) { }

    canActivate() {
        if (this.localStorage.retrieve('access_token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.auth.login();
        return false;
    }
}
