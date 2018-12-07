import {Component, Input, OnInit} from '@angular/core';
import {MainRequestService} from '../../../../../services/main-request.service';

@Component({
    selector: 'app-accept-request',
    templateUrl: './accept-request.component.html',
    styleUrls: ['./accept-request.component.scss']
})
export class AcceptRequestComponent implements OnInit {


    @Input() rowData: any;

    constructor(
        private request: MainRequestService,
    ) {
    }

    ngOnInit() {
    }

    acceptRequest(id) {
            this.request.postData(`v1/users/upgrade_requests/${id}/approve`, {}).subscribe(res => {
        })
    }

}
