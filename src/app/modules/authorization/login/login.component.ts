import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { AUTH_CONFIG, AuthorizationConfig } from '../authorization-config.module';
import { LocalStorageService } from 'ngx-webstorage';
import {NgForm} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';

    public authConfirm = false;

    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private loginService: LoginService,
        private toasterService: ToasterService,
        @Inject(AUTH_CONFIG) private config: AuthorizationConfig
    ) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout();

        if(this.loginService.authErr){
            this.toasterService.pop('Error', 'Сессія', 'Час сессії скінчився, будь-ласка авторизуйтесь ще раз.')
        }

    }

    login(form: NgForm) {
        this.loading = true;
        this.loginService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    if (this.config.twoStepsAuthorization){
                        this.authConfirm = true;
                    } else {
                        this.router.navigate([this.config.routeAfterLogin]);
                    }
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

}
