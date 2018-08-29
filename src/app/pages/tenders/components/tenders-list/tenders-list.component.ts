import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { DetailsComponent } from './details/details.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders-list.component.html',
  styleUrls: ['./tenders-list.component.scss']
})
export class TendersListComponent implements OnInit {

    constructor(
        private request: MainRequestService,
        private datePipe: DatePipe,
    ) {
    }

    public requestsList;
    public settings = {
        actions: {
            delete: false,
            add: false,
            edit: false,
        },
        columns: {
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
                    if(date){
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

        this.request.getData('v1/marketplace/tenders' ).subscribe( res => {
            this.requestsList = JSON.parse(res);
        })
    }

}
