import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { AcceptRequestComponent } from './accept-request/accept-request.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-request-assistance',
  templateUrl: './request-upgrade.component.html',
  styleUrls: ['./request-upgrade.component.scss']
})
export class RequestUpgradeComponent implements OnInit {

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
        private datePipe: DatePipe,
        private usersService: UsersService,
    ) { }

    public settings = {
        actions: {
            delete: false,
            add: false,
            edit: false,
        },
        columns: {
            email: {
                title: 'Email',
                editable: false,
            },
            role: {
                title: 'Role',
                editable: false,
            },
            created_at: {
                title: 'Created',
                filter: false,
                sort: false,
                valuePrepareFunction: (date) => {
                    if (date) {
                        const raw = new Date(date);

                        const formatted = this.datePipe.transform(raw, 'dd.MM.yyyy');
                        return formatted;
                    }
                }
            },
            upgraded_at: {
                title: 'Upgraded',
                filter: false,
                sort: false,
                valuePrepareFunction: (date) => {
                    if (date) {
                        const raw = new Date(date);

                        const formatted = this.datePipe.transform(raw, 'dd.MM.yyyy');
                        return formatted;
                    }
                }
            },
            profiles: {
                title: 'Details',
                type: 'custom',
                editable: false,
                filter: false,
                sort: false,
                renderComponent: UserInfoComponent,
            },
            id: {
                title: 'Accept',
                type: 'custom',
                editable: false,
                filter: false,
                sort: false,
                renderComponent: AcceptRequestComponent,
            },
        }
    };

    ngOnInit() {
        this.usersService.getUpgradeRequests().subscribe( res => {
            this.usersService.getUpgradeList = res;
        })
    }

}
