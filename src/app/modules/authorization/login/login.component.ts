import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_CONFIG, AuthorizationConfig } from '../authorization-config.module';
import { LocalStorageService } from 'ngx-webstorage';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['styles.scss']
})

export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';

    public authConfirm = false;

    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private authService: AuthenticationService,
        private toasterService: ToastrService,
        @Inject(AUTH_CONFIG) private config: AuthorizationConfig
    ) { }

    ngOnInit() {
        if(this.localStorage.retrieve('access_token')){
            this.router.navigate(['/']);
        }
    }

    login(form: NgForm) {
        this.loading = true;
        this.authService.login(this.model.username, this.model.password)
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
