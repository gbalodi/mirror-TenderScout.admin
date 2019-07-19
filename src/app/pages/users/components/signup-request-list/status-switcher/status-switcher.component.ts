import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { MainRequestService } from '../../../../../services/main-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-request-details',
    templateUrl: './status-switcher.component.html',
    styleUrls: ['./status-switcher.component.scss']
})
export class StatusSwitcherComponent implements ViewCell, OnInit {

    @Input() value;

    constructor(
        private request: MainRequestService,
        private toasterService: ToastrService,
    ) {  }

    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
    }

    onChange(e) {
        this.request.putData(`v1/user/registration_request/${this.rowData.id}/process`, {})
            .subscribe( res => {
                this.toasterService.success('Successful operation', 'Success');
                this.rowData.do_processed = true;
            }, error => {
                this.toasterService.error('Oops, error', 'Please, try again.');
            })
    }
}
