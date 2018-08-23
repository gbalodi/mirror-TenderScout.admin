import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';

@Component({
  selector: 'app-reqs-list',
  templateUrl: './reqs-list.component.html',
  styleUrls: ['./reqs-list.component.scss']
})
export class SignupReqListComponent implements OnInit {

    constructor(
        private request: MainRequestService,
    ) {
    }

    public requestsList;
    public settings = {
        actions: {
            delete: false,
            add: false,
            edit: false
        },
        columns: {
            fullname: {
                title: 'Full Name'
            },
            company: {
                title: 'Company'
            },
            do_processed: {
                title: 'Is processed',
                valuePrepareFunction: (value) => { return value === 1 ? 'Yes' : 'No' }
            },
        }
    };

    ngOnInit() {
        this.request.getData('v1/user/registration_request' ).subscribe( res => {
            console.log(res);//TODO: Delete

            this.requestsList = JSON.parse(res);
        })
    }

}
