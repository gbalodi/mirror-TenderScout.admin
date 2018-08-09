/*modules*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationConfigModule } from './authorization-config.module';

/*services*/
import { LoginService, AuthConfirmService, RegistrationService } from './services/index';
import { AuthGuard } from './services/auth-guard.service';

/*components*/
import { LoginComponent } from './login/index';
import { RegistrationComponent } from './registration/registration.component';
import { AuthConfirmComponent } from './auth-confirm/auth-confirm.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AuthorizationRoutingModule,
        AuthorizationConfigModule,
    ],
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthConfirmComponent,
    ],
    providers: [
        AuthConfirmService,
        LoginService,
        RegistrationService,
        AuthGuard
    ],
    exports: []
})

export class AuthorizationModule { }
