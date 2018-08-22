import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MainRequestService } from '../../../services/main-request.service';

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
        fullname: new FormControl(''),
        display_name: new FormControl(''),
        company: new FormControl(''),
        timezone: new FormControl(''),
        contacts: new FormControl(''),
    });

    // private cont = [{"type": "email", "value": this.profileForm.get('email_contact')}];

    // get contacts() {
    //     return this.profileForm.get('contacts') as FormArray;
    // }

    onSubmit() {

        let mail = this.profileForm.value.contacts;

        console.log('submit', this.profileForm.value, this.profileForm.value.contacts );//TODO: Delete

        this.profileForm.patchValue({
            contacts: [{ type: 'email', value: this.profileForm.value.contacts }] ,
            timezone: this.timezone
        });

        console.log(this.profileForm.value);//TODO: Delete

        // this.contacts.push(this.fb.control(''));

        this.request.postData('v1/users', this.profileForm.value ).subscribe( res => {
            this.profileForm.patchValue({
                contacts: mail ,
            });
        })
    }


}
