import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { WebSocketService } from 'app/services/web-socket.service';

@Component({
    selector: 'app-request-assistance',
    templateUrl: './request-assistance.component.html',
    styleUrls: ['./request-assistance.component.scss', '../users-list/users-list.component.scss']
})
export class RequestAssistanceComponent implements OnInit {
    public searchFilterForm: FormGroup;
    public itemsPerPage: number = 20;
    public totalItems: number;
    public requestAssistances: Array<any> = [];
    public paramRequest: any;
    public statuses = [
        { name: 'Select Status', type: '' },
        { name: 'Opened', type: 'opened' },
        { name: 'Closed', type: 'closed' },
    ];
    public tableHeadNames: Array<{ title: string; key: string; }> = [
        { title: 'User', key: 'user' },
        { title: 'Message', key: 'message' },
        { title: '(Tender/Knowledge/Academy) Request', key: 'tender' },
        { title: 'Tender Closing Date', key: 'submissionDate' },
        { title: 'Attachments', key: 'attachments' },
        { title: 'Status', key: 'status' },
        { title: 'Action', key: 'action' }
    ];

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
        public formBuilder: FormBuilder,
        private webSocketService: WebSocketService
    ) {
        this.webSocketService.changeDetectResponse.subscribe(res => {
            if (res) {
                this.searchFilterForm.controls['page'].setValue(this.searchFilterForm.controls['page'].value);
            }
        });
    }

    ngOnInit() {
        this.searchFilterForm = this.formBuilder.group({
            email: [''],
            status: [''],
            all: [''],
            page: [1]
        });

        this.searchFilterForm.valueChanges.pipe(
            debounceTime(700),
            // Set Request params according to filtration by HttpParams class...
            tap((value) => this.paramRequest = new HttpParams()
                .set('page_size', this.itemsPerPage.toString())
                .set('page', value.page.toString())
                .set('[filter][username]', value.email)
                .set('[filter][status]', value.status)
                .set('[filter][request_type]', value.all)
            ),
            switchMap(() => this.request.getDataWithParams(`v2/assistances/requests`, this.paramRequest))
        ).subscribe((res: any) => {
            res = JSON.parse(res);
            this.requestAssistances = res.data;
            this.totalItems = res.count;
        }, error => {
            this.toasterService.error('Error', error);
        });

        this.searchFilterForm.controls['page'].setValue(1);
        this.webSocketService.callAssistRequestStream();
        this.webSocketService.setAssistRequestSubscription();
        this.webSocketService.assistRequestSubscribe();
    }
}
