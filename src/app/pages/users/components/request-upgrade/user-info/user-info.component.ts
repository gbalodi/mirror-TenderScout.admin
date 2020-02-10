import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    selector: 'app-request-details',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements ViewCell, OnInit {

    public reqData;

    @Input() value;

    constructor() { }

    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.reqData = Object.keys(this.rowData.profiles[0]);
        this.rowData = this.rowData.profiles[0];
    }
}
