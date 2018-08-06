import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: AUTH_CONFIG.callbackURL
    });

    constructor(
        public router: Router,
        private localStorage:LocalStorageService
    ) {
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.router.navigate(['/']);
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        this.localStorage.store('access_token', authResult.accessToken);
        this.localStorage.store('id_token', authResult.idToken);
        this.localStorage.store('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from this.localStorage
        this.localStorage.clear('access_token');
        this.localStorage.clear('id_token');
        this.localStorage.clear('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return new Date().getTime() < expiresAt;
    }

}
