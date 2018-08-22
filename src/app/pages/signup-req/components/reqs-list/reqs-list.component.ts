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
            display_name: {
                title: 'Display Name'
            },
            email: {
                title: 'Email'
            },
            company: {
                title: 'Company'
            },
        }
    };

    ngOnInit() {
        this.request.getData('v1/users/registration_request' ).subscribe( res => {
            console.log(res);//TODO: Delete

            this.requestsList = JSON.parse(res);
        })
    }

}
