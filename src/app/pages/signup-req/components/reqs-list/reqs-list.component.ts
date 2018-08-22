import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';

@Component({
  selector: 'app-reqs-list',
  templateUrl: './reqs-list.component.html',
  styleUrls: ['./reqs-list.component.scss']
})
export class ReqsListComponent implements OnInit {

  constructor(
      private request: MainRequestService,
  ) { }
    public requestsList;
    public settings = {
        actions: {
            delete:false,
            add:false,
            edit: false
        },
        columns: {
            fullname: {
                title: 'Full Name'
            },
            company: {
                title: 'Company'
            },
            company_size: {
                title: 'Company size'
            },
            state: {
                title: 'State'
            },
            city: {
                title: 'City'
            },
            tender_level: {
                title: 'Tender LVL'
            },
            win_rate: {
                title: 'Win Rate'
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
