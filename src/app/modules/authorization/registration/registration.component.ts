import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegistrationService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html'
})

export class RegistrationComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    public authConfirm = false;

    constructor(private router: Router,
                private registrationService: RegistrationService) {
    }

    ngOnInit() {
    }

    register() {
        this.loading = true;
        this.registrationService.register(this.model)
            .subscribe(result => {
                if (result === true) {
                    // this.router.navigate(['/']);
                    this.authConfirm = true;
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
