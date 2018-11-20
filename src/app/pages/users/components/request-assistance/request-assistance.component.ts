import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {MainRequestService} from '../../../../services/main-request.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-request-assistance',
  templateUrl: './request-assistance.component.html',
  styleUrls: ['./request-assistance.component.scss']
})
export class RequestAssistanceComponent implements OnInit {

    public page: number = 1;
    public itemsPerPage: number = 20;
    public totalItems: number;
    public maxSize: number = 5;
    public numPages: number = 1;
    public source: LocalDataSource = new LocalDataSource();
    public searchResetData: Array<object>;
    public searchResetActive: boolean = false;
    public usersList;
    public settings = {
        mode: 'inline',
        actions: {
            delete: false,
            add: false,
            edit: false
        },
        columns: {
            user_id: {
                title: 'User ID',
            },
            fullname: {
                title: 'Fullname',
            },
            email: {
                title: 'Email',
            },
            assistance_type: {
                title: 'Assistance type',
            },
            tender_id: {
                title: 'TenderId',
                type: 'html',
                valuePrepareFunction: (tender_id) => {
                    return `<a target="_blank" href="http://hub.tenderscout.com/tenders/${tender_id}">${tender_id}</a>`;
                }
            },
            created_at: {
                title: 'Created at',
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
        }
    };

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
        private datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.request.getData(`v1/assistances?page_size=${this.itemsPerPage}&page=1` ).subscribe( res => {
            const result = JSON.parse(res);

            this.source.setPaging(1, this.itemsPerPage,true );
            this.source.load( result.data );
            this.totalItems = result.count;
            this.searchResetActive = true;
        },
            error => {
                this.toasterService.error('Error', error);
            });
    }

    pageChanged(event) {
        this.request.getData(`v1/assistances?page_size=${this.itemsPerPage}&page=${event.page}`).subscribe(res => {
                const result = JSON.parse(res);

                this.source.setPaging(1, this.itemsPerPage,true );
                this.source.load( result.data );
                this.totalItems = result.count;
            },
            error => {
                this.toasterService.error('Error', error);
            });
    }


}
