import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

export let AUTH_CONFIG = new InjectionToken<AuthorizationConfig>('authorization.config');

export class AuthorizationConfig {
    apiRegUrl: string;
    apiRegConfirmUrl: string;
    apiLoginUrl: string;
    apiLoginConfirmUrl: string;
    routeAfterLogin: string;
    routeAfterRegistration: string;
    twoStepsRegistration: boolean;
    twoStepsAuthorization: boolean;
}

export const AUTH_DI_CONFIG: AuthorizationConfig = {
    apiRegUrl: '',
    apiRegConfirmUrl: '',
    apiLoginUrl: 'v1/auth/login',
    apiLoginConfirmUrl: '',
    routeAfterLogin: '/',
    routeAfterRegistration: '/',
    twoStepsRegistration: false,
    twoStepsAuthorization: false,
};

@NgModule({
    providers: [{
        provide: AUTH_CONFIG,
        useValue: AUTH_DI_CONFIG
    }],
    imports: [
        CommonModule
    ],
    declarations: []
})

export class AuthorizationConfigModule {
}
