import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { DetailsComponent } from '../signup-request-list/details/details.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    public page: number = 1;
    public itemsPerPage: number = 20;
    public totalItems: number;
    public maxSize: number = 5;
    public numPages: number = 1;
    public source: LocalDataSource = new LocalDataSource();
    public searchResetData: Array<object>;
    public searchResetActive: boolean = false;
    public usersList;
    public settings = {
        mode: 'inline',
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
                editable: false
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
                            {value: 'admin', title: 'admin'},
                            {value: 'standart', title: 'standard'},
                            {value: 'basic', title: 'basic'},
                            {value: 'free', title: 'free'},
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

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
        private datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.request.getData(`v1/users?page_size=${this.itemsPerPage}&page=1` ).subscribe( res => {
            const result = JSON.parse(res);
            result.data.forEach(user => {
                user['profile'] = user.profiles[0];
                user['onlyProfile'] = true;
                delete user.profiles;
                return  user;
            });
            this.source.setPaging(1, this.itemsPerPage,true );
            this.source.load( result.data );
            this.totalItems = result.count;
            this.searchResetActive = true;
        })
    }

    pageChanged(event) {
        this.request.getData(`v1/users?page_size=${this.itemsPerPage}&page=${event.page}`).subscribe(res => {
                const result = JSON.parse(res);
                result.data.forEach(user => {
                    user['profile'] = user.profiles[0];
                    user['onlyProfile'] = true;
                    delete user.profiles;
                    return  user;
                });
                this.source.setPaging(1, this.itemsPerPage,true );
                this.source.load( result.data );
                this.totalItems = result.count;
            },
            error => {
                this.toasterService.error('Error', error);
            });
    }

    onEditConfirm(event): void {
        if ( event.data.role !== event.newData.role ) {
            this.request.putData(`v1/users/${event.data.id}/change_user_role`, { role: event.newData.role }).subscribe( () => {
                this.toasterService.success('Successful operation', 'Success');
                event.confirm.resolve();
            }, () => {
                this.toasterService.error('Ooops, error', 'Try again');
                event.confirm.reject();
            });
        }
    }

}
