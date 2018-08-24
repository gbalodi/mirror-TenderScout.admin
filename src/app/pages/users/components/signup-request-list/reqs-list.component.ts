import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { DetailsComponent } from './details/details.component';

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
        },
        columns: {
            fullname: {
                title: 'Full Name',
                editable: false,
            },
            company: {
                title: 'Company',
                editable: false,
            },
            do_processed: {
                title: 'Is processed',
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        list: [{value: 'true', title: 'Yes'}, {value: 'false', title: 'No'}]
                    }
                },
                valuePrepareFunction: (value) => { return value === 1 ? 'Yes' : 'No' },
            },
            detailInfo: {
                title: 'Details',
                type: 'custom',
                editable: false,
                filter: false,
                sort: false,
                renderComponent: DetailsComponent,
            }
        }
    };

    ngOnInit() {

        this.request.getData('v1/user/registration_request' ).subscribe( res => {
            this.requestsList = JSON.parse(res);
        })
    }

}
