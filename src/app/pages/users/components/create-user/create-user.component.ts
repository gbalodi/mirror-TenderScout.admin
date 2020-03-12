import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MainRequestService } from '../../../../services/main-request.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
    public contractsNumberItems: any = ['0', '1 - 5', '6 - 10', '11 - 20', '20 - 50', '50+'];
    public marketPlaceItems: any = ['available', 'pending', 'not_available'];
    public profileType: Array<any> = [{ name: 'consultant' }, { name: 'company' }, { name: 'buyer' }];
    public tenderLevel: any = ['0', '1 - 5', '6 - 10', '11 - 20', '20 - 50', '50+'];
    public userId: number;
    public countries: any;
    public industries: any;
    public timezone = '';
    public profileForm: FormGroup;
    public created: boolean;
    public roles = ['admin', 'standard', 'basic', 'free'];
    public localTime: string;

    constructor(
        private fb: FormBuilder,
        private request: MainRequestService,
        private activatedRoute: ActivatedRoute,
        private toasterService: ToastrService
    ) { }

    ngOnInit() {
        this.profileForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            id: new FormControl(''),
            password: new FormControl(''),
            fullname: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            display_name: new FormControl('', Validators.required),
            company: new FormControl('', Validators.required),
            company_size: new FormControl('', Validators.required),
            assistance_credits: new FormControl(''),
            timezone: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            number_public_contracts: new FormControl('', Validators.required),
            marketplace_status: new FormControl(true, Validators.required),
            country_id: new FormControl([], Validators.required),
            profile_type: new FormControl([], Validators.required),
            tender_level: new FormControl('', Validators.required),
            industry_id: new FormControl([], Validators.required),
            contacts_attributes: this.fb.array([
                ...this.contactsTypes.map((contact_type) => {
                    console.log("ONE")
                    return this.fb.group({
                        contact_type: contact_type,
                        value: [''],
                        id: [''],
                    });
                })
            ])
        });

        this.request.getData('v1/dictionaries/countries').subscribe(res => {
            this.countries = JSON.parse(res);
        });

        this.request.getData('v1/dictionaries/industries').subscribe(res => {
            this.industries = JSON.parse(res);
        });

        this.activatedRoute.paramMap.subscribe((params: any) => {
            if (params.get("id")) {
                this.userId = params.get("id");
                this.request.getSpecificUserData(this.userId).subscribe((res: any) => {
                    res = JSON.parse(res);
                    this.profileForm.controls['email'].setValue(res.email);
                    this.profileForm.controls['fullname'].setValue(res.profiles[0].fullname);
                    this.profileForm.controls['city'].setValue(res.profiles[0].city);
                    this.profileForm.controls['display_name'].setValue(res.profiles[0].display_name);
                    this.profileForm.controls['company'].setValue(res.profiles[0].company);
                    this.profileForm.controls['company_size'].setValue(res.profiles[0].company_size);
                    this.profileForm.controls['role'].setValue(res.profiles[0].role);
                    this.profileForm.controls['description'].setValue(res.profiles[0].description);
                    this.profileForm.controls['number_public_contracts'].setValue(res.profiles[0].number_public_contracts);
                    this.profileForm.controls['country_id'].setValue(res.profiles[0].country ? res.profiles[0].country.id : []);
                    this.profileForm.controls['profile_type'].setValue(res.profiles[0].profile_type);
                    this.profileForm.controls['tender_level'].setValue(res.profiles[0].tender_level);
                    this.profileForm.controls['industry_id'].setValue(res.profiles[0].industry ? res.profiles[0].industry.id : []);
                    this.profileForm.controls['marketplace_status'].setValue(res.marketplace_status);
                    this.profileForm.controls['marketplace_status'].setValue(res.marketplace_status);
                    this.profileForm.controls['assistance_credits'].setValue(res.assistance_credits);

                    let contactFormGroups = res.profiles[0].contacts.map(contact => this.fb.group(contact));
                    var responseContact = [];
                    contactFormGroups.forEach(element => {
                        responseContact.push(element.value.contact_type);
                    });
                    var uncommonContactsTypes = [];
                    this.contactsTypes.forEach(element1 => {
                        var found = responseContact.find((element2) => {
                            return element2 === element1;
                        });
                        if (!found) {
                            uncommonContactsTypes.push(element1);
                        }
                    });

                    var finalContactFormGroups = uncommonContactsTypes.map((contact_type) => {
                        return this.fb.group({
                            contact_type: contact_type,
                            value: [''],
                            id: [''],
                        });
                    })
                    if (finalContactFormGroups.length > 0) {
                        finalContactFormGroups.forEach(element => {
                            contactFormGroups.push(element);
                        });
                    }
                    let contactFormArray = this.fb.array(contactFormGroups);
                    this.profileForm.setControl('contacts_attributes', contactFormArray);
                    this.changeTimezone(res.profiles[0].timezone);
                    this.profileForm.controls['id'].setValidators([Validators.required]);
                    this.profileForm.controls['id'].setValue(res.profiles[0].id);
                }, error => {
                    console.log(error);
                });
            } else {
                this.profileForm.controls['password'].setValidators([Validators.required]);
            }
        })
    }

    get empFormArray(): FormArray {
        return this.profileForm.get('contacts_attributes') as FormArray;
    }

    public addEmployee() {
        let fg = this.fb.group(this.contactsTypes);
        this.empFormArray.push(fg);
    }


    public contactsTypes: string[] = ['phone', 'email', 'website', 'address'];

    public changeTimezone(countryIsoCode) {
        this.initTime(countryIsoCode);

        this.profileForm.patchValue({
            timezone: countryIsoCode
        });
    }

    public initTime(timeZone) {
        this.timezone = timeZone;
        this.localTime = moment().tz(timeZone ? timeZone : moment.tz.guess()).format("HH:mm");
    }

    public onSubmit() {
        this.profileForm.patchValue({
            timezone: this.timezone
        });

        this.request.postData('v1/users', this.profileForm.value).subscribe(() => this.success())
    }

    public success() {
        this.created = true;
        this.profileForm.disable();
    }

    public updateUser() {
        var obj = {
            email: this.profileForm.value.email,
            id: this.userId,
            role: this.profileForm.value.role,
            marketplace_status: this.profileForm.value.marketplace_status,
            assistance_credits: this.profileForm.value.assistance_credits,
            profiles_attributes: [this.profileForm.value]
        };
        this.request.putData(`v1/users/${this.userId}`, { user: obj }).subscribe((res: any) => {
            res = JSON.parse(res)
            this.toasterService.success(res.success, 'Success');
        }, error => {
            this.toasterService.error('Ooops, error', 'Try again');
        });
    }
}
