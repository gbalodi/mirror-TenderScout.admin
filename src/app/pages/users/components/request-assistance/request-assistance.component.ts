import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MainRequestService } from '../../../../services/main-request.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-request-assistance',
    templateUrl: './request-assistance.component.html',
    styleUrls: ['./request-assistance.component.scss', '../users-list/users-list.component.scss']
})
export class RequestAssistanceComponent implements OnInit {
    public searchFilterForm: FormGroup;
    public page: number = 1;
    public itemsPerPage: number = 20;
    public totalItems: number;
    public maxSize: number = 5;
    public numPages: number = 1;
    public source: LocalDataSource = new LocalDataSource();
    public searchResetData: Array<object>;
    public searchResetActive: boolean = false;
    public requestAssistances: Array<any> = [];
    public paramRequest: any;
    public statuses = [
        { name: 'Select Status', type: '' },
        { name: 'Opened', type: 'opened' },
        { name: 'Closed', type: 'closed' },
    ];
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
    public tableHeadNames: Array<{ title: string; key: string; }> = [
        { title: 'User', key: 'user' },
        { title: 'Status', key: 'status' },
        { title: 'Message', key: 'message' },
        { title: 'Tender/Knowledge Request', key: 'tender' },
        { title: 'Action', key: 'action' }
    ];

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
        private datePipe: DatePipe,
        public formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.searchFilterForm = this.formBuilder.group({
            email: [''],
            status: [''],
            all: ['']
        });

        this.searchFilterForm.valueChanges.pipe(
            debounceTime(700),
            tap((value) => this.paramRequest = new HttpParams()
                .set('page_size', this.itemsPerPage.toString())
                .set('page', this.page.toString())
                .set('[filter][username]', value.email)
                .set('[filter][status]', value.status)
                .set('[filter][request_type]', value.all)
            ),
            switchMap(() => this.request.getDataWithParams(`v2/assistances/requests`, this.paramRequest))
        ).subscribe((res: any) => {
            res = JSON.parse(res);
            console.log(res);
        })


        this.request.getData(`v2/assistances/requests?page_size=${this.itemsPerPage}&page=1`).subscribe(res => {
            const result = JSON.parse(res);

            this.source.setPaging(1, this.itemsPerPage, true);
            this.source.load(result.data);
            this.totalItems = result.count;
            this.searchResetActive = true;
            this.requestAssistances = result.data;
        },
            error => {
                this.toasterService.error('Error', error);
            });
    }

    public pageChanged(event) {
        this.request.getData(`v2/assistances/requests?page_size=${this.itemsPerPage}&page=${event.page}`).subscribe(res => {
            const result = JSON.parse(res);
            this.requestAssistances = result.data;

            this.source.setPaging(1, this.itemsPerPage, true);
            this.source.load(result.data);
            this.totalItems = result.count;
        }, error => {
            this.toasterService.error('Error', error);
        });
    }


}
