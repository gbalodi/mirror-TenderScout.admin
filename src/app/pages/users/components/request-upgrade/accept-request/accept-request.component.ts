import { Component, Input, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../../services/main-request.service';
import { UsersService } from '../../services/users.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-accept-request',
    templateUrl: './accept-request.component.html',
    styleUrls: ['./accept-request.component.scss']
})
export class AcceptRequestComponent implements OnInit {

    @Input() rowData: any;

    constructor(
        private request: MainRequestService,
        private usersService: UsersService,
    ) {
    }

    ngOnInit() {
    }

    acceptRequest(id) {
            this.request.postData(`v1/users/upgrade_requests/${id}/approve`, {}).pipe(
                switchMap(() => this.usersService.getUpgradeRequests())
            ).subscribe( res => {
                this.usersService.getUpgradeList = res;
            })
    }

}
