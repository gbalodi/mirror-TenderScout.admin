import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MainRequestService } from '../../services/main-request.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

    constructor(
        private request: MainRequestService
    ) { }


    public usersList;
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
        this.request.getData('v1/users' ).subscribe( res => {
            console.log(res);//TODO: Delete

            this.usersList = JSON.parse(res);
        })
    }

}
