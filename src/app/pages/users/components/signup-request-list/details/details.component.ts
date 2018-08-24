import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal/modal.directive';
import {LocalDataSource} from 'ng2-smart-table';
import {ViewCell} from 'ng2-smart-table';

@Component({
    selector: 'app-request-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements ViewCell, OnInit {

    public reqData;

    @Input() value;

    constructor() {  }

    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.reqData = Object.keys(this.rowData);
    }
}
