import { Component, OnInit } from '@angular/core';
import {MainRequestService} from '../../../../services/main-request.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {StatusSwitcherComponent} from '../signup-request-list/status-switcher/status-switcher.component';
import {UserInfoComponent} from './user-info/user-info.component';

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
    ) { }

    public requestsList;
    public settings = {
        actions: {
            delete: false,
            add: false,
            edit: false,
        },
        columns: {
            id: {
                title: 'ID',
                editable: false,
            },
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
            }
        }
    };

    ngOnInit() {
        this.request.getData('v1/users/upgrade_requests' ).subscribe( res => {
            this.requestsList = [];
            JSON.parse(res).forEach( item => {
               item.user['created_at'] = item.created_at;
               item.user['upgraded_at'] = item.upgraded_at;
               this.requestsList.push(item.user);
            });
        })
    }
}
