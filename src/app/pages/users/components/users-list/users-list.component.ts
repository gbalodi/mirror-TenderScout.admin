import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { DetailsComponent } from '../signup-request-list/details/details.component';
import { KeyValuePipe } from '@angular/common';
import { UsersService } from '../services/users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../signup-request-list/upload-file/upload-file.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

interface IUser {
    id: number;
    email: string;
    role: string;
    flags: Array<string>;
    marketplace_status: string;
    full_name: string;
    companies_status: boolean;
    agree: boolean;
    do_marketplace_available: boolean;
    profile_type: Array<string>;
    status: string;
    profiles: Array<any>;
};

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss', '../signup-request-list/details/details.component.scss'],
    providers: [
        KeyValuePipe
    ]
})
export class UsersListComponent implements OnInit {
    @ViewChild('selectFile') selectFile: ElementRef;
    public page: number = 1;
    public itemsPerPage: number = 20;
    public totalItems: number;
    public maxSize: number = 5;
    public numPages: number = 1;
    public source: LocalDataSource = new LocalDataSource();
    public searchResetData: Array<object>;
    public searchResetActive: boolean = false;
    public usersList;
    public userData: IUser[];
    public rowData: any;
    public rowDataObj: any;
    public approveModal: BsModalRef;
    public reqData;
    public resetPasswordForm: FormGroup;
    public changeRoleForm: FormGroup;
    public matchedPassword: boolean;
    public uploadToOrbidal: boolean = false;
    public fileToUpload: File = null;
    public thisIsCSV: boolean = true;
    public underFileSize: boolean = true;
    public uploadFileLoading: boolean = false;
    public statisticFilterForm: FormGroup;
    public searchFilterForm: FormGroup;
    public userStatisticsData: any;
    public roles = [
        { type: 'admin', disabled: false },
        { type: 'standard', disabled: false },
        { type: 'basic', disabled: false },
        { type: 'free', disabled: false }
    ];
    public fileTypes: String[] = ['xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'];
    public settings = {
        mode: 'inline',
        pager: { display: true, perPage: 20 },
        edit: {
            confirmSave: true,
        },
        actions: {
            delete: false,
            add: false,
            edit: true
        },
        columns: {
            id: {
                title: 'ID',
                editable: false
            },
            email: {
                title: 'Email',
                editable: true
            },
            profile_type: {
                title: 'Profile type',
                editable: false
            },
            role: {
                title: 'Role',
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            { value: 'admin', title: 'admin' },
                            { value: 'standard', title: 'standard' },
                            { value: 'basic', title: 'basic' },
                            { value: 'free', title: 'free' },
                        ]
                    }
                },
            },
            profile: {
                title: 'Details',
                type: 'custom',
                editable: false,
                filter: false,
                sort: false,
                renderComponent: DetailsComponent,
            }
        }
    };

    public tableHeadNames: Array<{ title: string; key: string; }> = [
        { title: 'ID', key: 'id' },
        { title: 'Email', key: 'email' },
        { title: 'Profile type', key: 'profile_type' },
        { title: 'Role', key: 'role' },
        { title: 'Actions', key: 'actions' }
    ];

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
        // private datePipe: DatePipe,
        private usersService: UsersService,
        private bsModalService: BsModalService,
        private formBuilder: FormBuilder,
        private uploadFileService: UploadFileService,
        private keyValuePipe: KeyValuePipe
    ) {
        this.usersService.loading$.subscribe(res => {
            if (res) {
                this.getData();
                this.usersService.loading$.next(false);
            }
        });
    }

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
            userId: ['', Validators.required]
        });

        this.changeRoleForm = this.formBuilder.group({
            userId: ['', Validators.required],
            role: ['', Validators.required]
        });

        this.statisticFilterForm = this.formBuilder.group({
            filter: ['', [Validators.required]],
        });

        this.searchFilterForm = this.formBuilder.group({
            email: [''],
            role: [["admin", "standard", "basic", "free"]]
        });

        this.statisticFilterForm.valueChanges.subscribe(data => {
            console.log('Username changed:' + data);
            this.getUserSessions();
        });

        this.searchFilterForm.valueChanges.pipe(
            debounceTime(700),
        ).subscribe(value => {
            this.getData();
        });
        this.getData();

    }

    public getData() {
        let queryString;
        let value = this.searchFilterForm.value;
        let params = new HttpParams();
        params = params.append('page_size', this.itemsPerPage.toString());
        params = params.append('page', this.page.toString());
        params = params.append('filter[username]', value.email);
        if (value.role.length > 0) {
            value.role.map((role) => {
                params = params.append('filter[role][]', role);
            })
        }
        this.request.getUsers(`v1/users`, params).subscribe(res => {
            this.usersResponses(res);
        }, error => {
            console.log(error);
        });
    }

    public usersResponses(res) {
        const result = JSON.parse(res);
        this.userData = result.data;
        this.totalItems = result.count;
    }

    public pageChanged(event) {
        this.page = event;
        this.getData();
    }

    public onEditConfirm(event): void {
        if (event.data.role !== event.newData.role) {
            this.request.putData(`v1/users/${event.data.id}/change_user_role`, { role: event.newData.role }).subscribe(() => {
                this.toasterService.success('Successful operation', 'Success');
                event.confirm.resolve();
            }, () => {
                this.toasterService.error('Ooops, error', 'Try again');
                event.confirm.reject();
            });
        }
    }

    public openModal(template: TemplateRef<any>, item: any, className: string) {
        this.rowData = item;
        if (this.rowData) {
            this.rowDataObj = this.rowData;
            if (this.rowData.profiles.length === 0) {
                
            } else {
                this.reqData = Object.keys(this.rowData.profiles[0]);
                this.rowData = this.rowData.profiles[0];
            }
        } else {
            this.reqData = Object.keys(this.rowData);
        }
        console.log(this.rowData);
        this.approveModal = this.bsModalService.show(template, { class: `modal-lg ${className}` });
    }

    /**
 * Check whether password is matched with password confirmation...
 * @param param 
 */
    public matchPassword(param) {
        if (this.resetPasswordForm.controls['password_confirmation'].value && this.resetPasswordForm.controls['password'].value !== this.resetPasswordForm.controls['password_confirmation'].value) {
            this.matchedPassword = false;
        } else if (this.resetPasswordForm.controls['password'].value === this.resetPasswordForm.controls['password_confirmation'].value) {
            this.matchedPassword = true;
        }
    }


    /**
     * Service call to update reset Password of the specific user...
     */
    public changePassword() {
        this.request.updateUserPassword(this.resetPasswordForm.value).subscribe((res: any) => {
            res = JSON.parse(res);
            this.toasterService.success(res.success, 'Success');
            this.approveModal.hide();
        }, error => {
            console.log(error);
        });
    }

    /**
     * Service call to update Role of the specific user...
     */
    public changeRole() {
        this.request.putData(`v1/users/${this.changeRoleForm.value.userId}/change_user_role`, { role: this.changeRoleForm.value.role }).subscribe(() => {
            this.getData();
            this.approveModal.hide();
            this.toasterService.success('Successful operation', 'Success');
        }, () => {
            this.toasterService.error('Ooops, error', 'Try again');
        });
    }

    /**
    * Event for file upload 
    * @param files 
    */
    public handleFileInput(files: FileList) {
        this.fileToUpload = File = null;
        if (!this.uploadToOrbidal) {
            var a = files.item(0).type;
            if (files.item(0).type === 'text/csv' || files.item(0).type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                if (files[0].size <= 44743292) {
                    this.fileToUpload = files.item(0);
                    this.thisIsCSV = true;
                    this.underFileSize = true;
                } else {
                    this.underFileSize = false;
                }
            } else {
                this.thisIsCSV = false;
            }
        } else {
            let getExtension = files[0].name.split('.');
            if (this.fileTypes.find(fileType => fileType === getExtension[getExtension.length - 1].toLocaleLowerCase()) !== undefined) {
                if (files[0].size <= 44743292) {
                    this.fileToUpload = files.item(0);
                    this.thisIsCSV = true;
                    this.underFileSize = true;
                } else {
                    this.underFileSize = false;
                }
            } else {
                this.thisIsCSV = false;
            }
        }
        console.log('this.fileToUpload', this.fileToUpload)
    }

    /**
     * Service call to upload to the server...
     */
    public uploadFile() {
        this.uploadFileLoading = true;
        const formData: FormData = new FormData();
        if (!this.uploadToOrbidal) {
            formData.append('import[file]', this.fileToUpload);
            formData.append('import[user_id]', this.rowDataObj.id);
        } else {
            formData.append('orbidal_document[file]', this.fileToUpload);
            formData.append('orbidal_document[user_id]', this.rowDataObj.id);
        }
        let callService = this.uploadToOrbidal ? 'uploadOrbidalDocuments' : 'importCSV_XLS';
        this.uploadFileService[callService](formData).subscribe((res: any) => {
            res = JSON.parse(res);
            this.uploadFileLoading = false;
            if (res.success) {
                this.toasterService.success(`${res.success}`, 'Success');
            }
            this.selectFile ? this.selectFile.nativeElement.value = '' : null;
            this.approveModal.hide();
        }, error => {
            console.log(error);
            this.uploadFileLoading = false;
            if (error.warning) {
                this.toasterService.warning(`${error.warning}`, 'Warning');
            }
        })
    }

    /**
     * API service call to get a user session info by it's id...
     */
    public getUserSessions() {
        this.usersService.getUserSessions(this.rowDataObj.id, this.statisticFilterForm.controls['filter'].value).subscribe((res: any) => {
            this.userStatisticsData = this.keyValuePipe.transform(JSON.parse(res));
        }, error => {
            console.log(error);
        });
    }

    public replaceUnderscore(string) {
        return string.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, (key) => { return key.toUpperCase() })
    }

    /**
 * API service call to set a user as Archive...
 */
    public archiveUserEvent() {
        let request = {
            status: 'archived'
        };
        this.usersService.archiveUser(this.rowDataObj.id, request).subscribe((res: any) => {
            res = JSON.parse(res);
            if (res.success) {
                this.toasterService.success(`User is now Archived.`, 'Success');
            }
            this.usersService.loading$.next(true);
            this.approveModal.hide();
        }, error => {
            console.log(error);
        });
    }

}
