import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MainRequestService } from '../../services/main-request.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private request: MainRequestService
    ) { }

    ngOnInit() {
    }


    // Example of usage in app.component.ts:
    timezone = '';
    countryIsoCode = '';
    placeholderString = 'Select timezone';

    changeTimezone(countryIsoCode) {
        this.timezone = countryIsoCode;
        console.log('tz', countryIsoCode, this.countryIsoCode);
    }
    countryChange(event){
        console.log(event);
    }
    /*profileForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        profile: this.fb.group({
            fullName: '',
            displayName: '',
            company: '',
            department: '',
            time_zone: this.timezone,
            contacts: this.fb.group({
                email: '',
                phone: ''
            })
        }),

    });*/

    profileForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        fullName: new FormControl(''),
        displayName: new FormControl(''),
        company: new FormControl(''),
        department: new FormControl(''),
        time_zone: new FormControl(''),
        email_contact: new FormControl(''),
        phone: new FormControl('')
    });


    onSubmit() {
        console.log('submit', this.profileForm.value);//TODO: Delete

        this.request.postData('v1/users', this.profileForm.value).subscribe( res => {
            console.log('res', res);
        })
    }


}
