import { Component, OnInit, Inject } from '@angular/core';
import { AuthConfirmService } from '../services/auth-confirm.service';
import { Router } from '@angular/router';

import { AUTH_CONFIG, AuthorizationConfig } from '../authorization-config.module';

@Component({
    selector: 'app-auth-confirm',
    templateUrl: './auth-confirm.component.html',
    styleUrls: ['./auth-confirm.component.scss']
})
export class AuthConfirmComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private authConfirmService: AuthConfirmService,
        private router: Router,
        @Inject(AUTH_CONFIG) private config: AuthorizationConfig
    ) { }

    ngOnInit() {
    }

    confirm() {
        this.loading = true;

        let confirmData = {
            operationValue: this.model.code,
            route: 'login'
        };
        this.authConfirmService.confirm(confirmData)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate([this.config.routeAfterLogin]);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
