import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import { MainRequestService } from '../../../../services/main-request.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private request: MainRequestService
    ) { }

    public profileForm: FormGroup;
    public created: boolean;

    ngOnInit() {
        this.profileForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            fullname: new FormControl('', Validators.required),
            display_name: new FormControl('', Validators.required),
            company: new FormControl('', Validators.required),
            timezone: new FormControl('', Validators.required),
            contacts: this.fb.array([
                ...this.contactsTypes.map(( contact_type ) => {
                    return this.fb.group({
                        contact_type: contact_type,
                        value: [ '', Validators.required],
                    });
                })
            ])
        });
    }


    timezone = '';
    public contactsTypes: string[] = ['phone','email'];

    changeTimezone(countryIsoCode) {
        this.timezone = countryIsoCode;

        this.profileForm.patchValue({
            timezone: countryIsoCode
        });
    }

    onSubmit() {
        this.profileForm.patchValue({
            timezone: this.timezone
        });

        this.request.postData('v1/users', this.profileForm.value ).subscribe( () => this.success())
    }

    success(){
        this.created = true;
        this.profileForm.disable();
    }


}
