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
    public profileForm: FormGroup | any;
    public created: boolean;
    public roles = ['admin', 'standard', 'basic', 'free'];
    public localTime: string;
    public editEmail: boolean = true;
    public existsEmail: boolean = false;
    public userEmail: string = '';

    constructor(
        private fb: FormBuilder,
        private request: MainRequestService,
        private activatedRoute: ActivatedRoute,
        private toasterService: ToastrService
    ) { }

    ngOnInit() {
        this.profileForm = this.fb.group({
            user: this.fb.group({
                email: ['', [Validators.required]],
                role: ['', [Validators.required]],
                marketplace_status: ['', [Validators.required]],
                assistance_credits: [''],
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                password: ['']
            }),
            profiles_attributes: this.fb.group({
                id: [''],
                timezone: ['', Validators.required],
                user_id: [''],
                city: ['', Validators.required],
                company_size: ['', Validators.required],
                country_id: [[], Validators.required],
                industry_id: [[], Validators.required],
                tender_level: ["", Validators.required],
                number_public_contracts: ["", Validators.required],
                company: ['', Validators.required],
                description: ['', Validators.required],
                profile_type: [[], Validators.required],
            }),
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
        // this.profileForm = new FormGroup({
        //     email: new FormControl('', [Validators.required]),
        //     id: new FormControl(''),
        //     password: new FormControl(''),
        //     fullname: new FormControl('', Validators.required),
        //     first_name: new FormControl(''),
        //     last_name: new FormControl(''),
        //     city: new FormControl('', Validators.required),
        //     display_name: new FormControl('', Validators.required),
        //     company: new FormControl('', Validators.required),
        //     company_size: new FormControl('', Validators.required),
        //     assistance_credits: new FormControl(''),
        //     timezone: new FormControl('', Validators.required),
        //     role: new FormControl('', Validators.required),
        //     description: new FormControl('', Validators.required),
        //     number_public_contracts: new FormControl('', Validators.required),
        //     marketplace_status: new FormControl(true, Validators.required),
        //     country_id: new FormControl([], Validators.required),
        //     profile_type: new FormControl([], Validators.required),
        //     tender_level: new FormControl('', Validators.required),
        //     industry_id: new FormControl([], Validators.required),
        //     contacts_attributes: this.fb.array([
        //         ...this.contactsTypes.map((contact_type) => {
        //             console.log("ONE")
        //             return this.fb.group({
        //                 contact_type: contact_type,
        //                 value: [''],
        //                 id: [''],
        //             });
        //         })
        //     ])
        // });

        this.request.getData('v1/dictionaries/countries').subscribe(res => {
            this.countries = JSON.parse(res);
        });

        this.request.getData('v1/dictionaries/industries').subscribe(res => {
            this.industries = JSON.parse(res);
        });

        this.activatedRoute.paramMap.subscribe((params: any) => {
            if (params.get("id")) {
                this.editEmail = false;
                this.userId = params.get("id");
                this.request.getSpecificUserData(this.userId).subscribe((res: any) => {
                    res = JSON.parse(res);
                    this.userEmail = res.email;
                    let profiles = res.profiles ? res.profiles[0] : null;
                    let userPatchValues = {

                    };
                    // let profilePatchValues = {
                    //     id: this.userId,
                    //     city: '',
                    //     company_size: '',
                    //     country_id: '',
                    //     industry_id: [],
                    //     tender_level: '',
                    //     number_public_contracts: '',
                    //     company: '',
                    //     description: '',
                    //     profile_type: [],
                    // }
                    // if (profiles) {
                    //     profilePatchValues = {
                    //         id: this.userId,
                    //         city: profiles.city,
                    //         company_size: profiles.company_size,
                    //         country_id: (profiles.country ? profiles.country.id : []),
                    //         industry_id: (profiles.industry ? profiles.industry.id : []),
                    //         tender_level: profiles.tender_level,
                    //         number_public_contracts: profiles.number_public_contracts,
                    //         company: profiles.company,
                    //         description: profiles.description,
                    //         profile_type: profiles.profile_type
                    //     }
                    // }

                    this.profileForm.patchValue({
                        user: {
                            email: res.email,
                            role: res.role,
                            marketplace_status: res.marketplace_status,
                            assistance_credits: res.assistance_credits,
                            first_name: res.first_name,
                            last_name: res.last_name,
                        },
                        // fullname: ['', [Validators.required]]
                        profiles_attributes: {
                            id: this.userId,
                            city: profiles ? profiles.city : '',
                            company_size: profiles ? profiles.company_size : '',
                            country_id: profiles ? (profiles.country ? profiles.country.id : '') : [],
                            industry_id: profiles ? (profiles.industry ? profiles.industry.id : []) : [],
                            tender_level: profiles ? profiles.tender_level : '',
                            number_public_contracts: profiles ? profiles.number_public_contracts : profiles,
                            company: profiles ? profiles.company : '',
                            description: profiles ? profiles.description : '',
                            profile_type: profiles ? profiles.profile_type : ''
                        },
                    });

                    // this.profileForm.controls['profiles_attributes'].patchValidators([Validators.required]);
                    // this.profileForm.controls['id'].setValue(profiles ? profiles.id : res.id);



                    // // let profiles = res.profiles_attributes ? res.profiles_attributes[0] : null;
                    // this.profileForm.controls['email'].setValue(res.email);
                    // this.profileForm.controls['fullname'].setValue(res.first_name + ' ' + res.last_name);
                    // this.profileForm.controls['city'].setValue(profiles ? profiles.city : '');
                    // this.profileForm.controls['display_name'].setValue(profiles ? profiles.display_name : '');
                    // this.profileForm.controls['company'].setValue(profiles ? profiles.company : '');
                    // this.profileForm.controls['company_size'].setValue(profiles ? profiles.company_size : '');
                    // this.profileForm.controls['role'].setValue(res.role);
                    // this.profileForm.controls['description'].setValue(profiles ? profiles.description : '');
                    // this.profileForm.controls['number_public_contracts'].setValue(profiles ? profiles.number_public_contracts : '');
                    // this.profileForm.controls['country_id'].setValue(profiles ? (profiles.country ? profiles.country.id : []) : []);
                    // this.profileForm.controls['profile_type'].setValue(profiles ? profiles.profile_type : '');
                    // this.profileForm.controls['tender_level'].setValue(profiles ? profiles.tender_level : '');
                    // this.profileForm.controls['industry_id'].setValue(profiles ? (profiles.industry ? profiles.industry.id : []) : []);
                    // this.profileForm.controls['marketplace_status'].setValue(res.marketplace_status);
                    // this.profileForm.controls['assistance_credits'].setValue(res.assistance_credits);

                    let contactFormGroups = profiles ? profiles.contacts.map(contact => this.fb.group(contact)) : [];
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
                    profiles ? this.changeTimezone(profiles.timezone) : null;
                    // this.profileForm.controls['id'].setValidators([Validators.required]);
                    // this.profileForm.controls['id'].setValue(profiles ? profiles.id : res.id);
                }, error => {
                    console.log(error);
                });
            } else {
                this.editEmail = true;
                this.profileForm.controls['user'].controls['password'].setValidators([Validators.required]);
            }
        })
    }

    get empFormArray(): FormArray {
        return this.profileForm.get('contacts_attributes') as FormArray;
    }

    public validEmail() {
        if (this.profileForm.value.user.email.length > 0 && this.userEmail !== this.profileForm.value.user.email) {
            this.request.postData(`v2/admin/users/check_email`, { email: this.profileForm.value.user.email }).subscribe((res: any) => {
                res = JSON.parse(res);
                this.existsEmail = res.exists;
            }, error => {
                console.error(error);
            });
        }else{
            this.existsEmail = false;
        }
    }

    public addEmployee() {
        let fg = this.fb.group(this.contactsTypes);
        this.empFormArray.push(fg);
    }


    public contactsTypes: string[] = ['phone', 'email', 'website', 'address'];

    public changeTimezone(countryIsoCode) {
        this.initTime(countryIsoCode);

        this.profileForm.patchValue({
            profiles_attributes: {
                timezone: countryIsoCode
            }
        });
    }

    public initTime(timeZone) {
        this.timezone = timeZone;
        this.localTime = moment().tz(timeZone ? timeZone : moment.tz.guess()).format("HH:mm");
    }

    public onSubmit() {
        this.profileForm.patchValue({
            profiles_attributes: {
                timezone: this.timezone
            }
        });

        this.request.postData('v2/admin/users', this.profileForm.value).subscribe(() => this.success())
    }

    public success() {
        this.created = true;
        this.profileForm.disable();
    }

    public updateUser() {
        // var obj = {
        //     user: {
        //         email: this.profileForm.value.email,
        //         id: this.userId,
        //         role: this.profileForm.value.role,
        //         marketplace_status: this.profileForm.value.marketplace_status,
        //         first_name: this.profileForm.value.fullname.split(' ')[0],
        //         last_name: this.profileForm.value.fullname.split(' ').splice(1).join(' '),
        //         assistance_credits: this.profileForm.value.assistance_credits
        //     },
        //     profiles_attributes: [this.profileForm.value]
        // };
        this.request.putData(`v2/admin/users/${this.userId}`, this.profileForm.value).subscribe((res: any) => {
            res = JSON.parse(res)
            this.toasterService.success(res.success, 'Success');
        }, error => {
            this.toasterService.error('Ooops, error', 'Try again');
        });
    }
}
