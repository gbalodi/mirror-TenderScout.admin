import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { SessionStorageService } from 'ng2-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionStorage: SessionStorageService
    ) { }

    canActivate() {
        if (this.sessionStorage.retrieve('access_token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
