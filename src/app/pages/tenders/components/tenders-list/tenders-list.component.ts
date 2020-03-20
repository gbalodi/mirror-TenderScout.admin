import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { DetailsComponent } from './details/details.component';
import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { EditTenderButtonComponent } from './edit-tender-button/edit-tender-button.component';

@Component({
    selector: 'app-tenders',
    templateUrl: './tenders-list.component.html',
    styleUrls: ['./tenders-list.component.scss']
})
export class TendersListComponent implements OnInit {

    constructor(
        private request: MainRequestService,
        private datePipe: DatePipe,
        private toasterService: ToastrService,
    ) {
    }

    public page: number = 1;
    public itemsPerPage: number = 20;
    public totalItems: number;
    public maxSize: number = 5;
    public numPages: number = 1;

    source: LocalDataSource = new LocalDataSource();
    searchResetData: Array<object>;
    searchResetActive: boolean = false;

    public settings = {
        actions: {
            delete: false,
            add: false,
            edit: false,
        },
        columns: {
            editAction: {
                title: 'Edit',
                type: 'custom',
                editable: false,
                filter: false,
                sort: false,
                renderComponent: EditTenderButtonComponent,
            },
            id: {
                title: 'ID',
                editable: false,
            },
            title: {
                title: 'Title',
                editable: false,
            },
            organization_name: {
                title: 'Buyer',
                editable: false,
            },
            status_cd: {
                title: 'Status',
                editable: false,
                /*type: 'html',
                editor: {
                    config: {
                        list: [{ value: '1', title: 'Active' }, { value: '0', title: 'NA' }]
                    }
                },
                valuePrepareFunction: (value) => { if(value ==true){return 'Active'}else{return "NA"} },*/
            },
            created_at: {
                title: 'Create date',
                editable: false,
                filter: false,
                valuePrepareFunction: (date) => {
                    if (date) {
                        var raw = new Date(date);

                        var formatted = this.datePipe.transform(raw, 'dd.MM.yyyy');
                        return formatted;
                    }
                }
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
        this.request.getData(`v1/marketplace/tenders?page_size=${this.itemsPerPage}&page=1`).subscribe(res => {
            this.tableInit(JSON.parse(res));
            this.searchResetActive = true;
        })
    }

    pageChanged(event) {
        this.request.getData(`v1/marketplace/tenders?page_size=${this.itemsPerPage}&page=${event.page}`).subscribe(res => {
            this.tableInit(JSON.parse(res));
        },
            error => {
                this.toasterService.error('Error', error);
            });
    }

    tableInit(data) {
        this.source.setPaging(1, this.itemsPerPage, true);
        this.source.load(data.data);
        this.totalItems = data.count;
    }

}
