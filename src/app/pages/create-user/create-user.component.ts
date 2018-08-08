import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
    }


    // Example of usage in app.component.ts:
    timezone = '';
    placeholderString = 'Select timezone';

    changeTimezone(timezone) {
        this.timezone = timezone;
    }

    profileForm = new FormGroup({
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

    });


    onSubmit(){
      console.log('submit', this.profileForm.value);//TODO: Delete
    }


}
