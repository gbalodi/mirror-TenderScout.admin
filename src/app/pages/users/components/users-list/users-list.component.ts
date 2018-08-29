import { Component, OnInit, ViewChild } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
    ) { }

    public page:number = 1;
    public itemsPerPage:number = 20;
    public totalItems:number;
    public maxSize:number = 5;
    public numPages:number = 1;

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

    source: LocalDataSource = new LocalDataSource();
    searchResetData: Array<object>;
    searchResetActive: boolean = false;

    ngOnInit() {
        this.request.getData(`v1/users?page_size=${this.itemsPerPage}&page=1` ).subscribe( res => {
            let result = JSON.parse(res);
            this.source.setPaging(1, this.itemsPerPage,true);
            this.source.load( result.data );
            this.totalItems = result.count;
            this.searchResetActive = true;
        })
    }

    pageChanged(event){
        this.request.getData(`v1/users?page_size=${this.itemsPerPage}&page=${event.page}`).subscribe(res => {
                let result = JSON.parse(res);
                this.source.setPaging(1, this.itemsPerPage,true);
                this.source.load( result.data );
                this.totalItems = result.count;
            },
            error => {
                // error - объект ошибки
                this.toasterService.error('Error', error);
            });
    }

}
