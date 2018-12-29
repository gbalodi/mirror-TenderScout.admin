import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { DetailsComponent } from '../signup-request-list/details/details.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './request-marketplace.html',
  styleUrls: ['./request-marketplace.scss']
})
export class RequestMarketplaceComponent implements OnInit {

    public source: LocalDataSource = new LocalDataSource();
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
            do_marketplace_available: {
                title: 'Marketplace',
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
        this.getUsersList();
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

    getUsersList(){
        this.request.getData(`v1/users/marketplace_availability_requests`).subscribe(res => {
            const result = JSON.parse(res);
            this.source.load( result.data );
        },
        error => {
            this.toasterService.error('Error', error);
        });
    }

}
