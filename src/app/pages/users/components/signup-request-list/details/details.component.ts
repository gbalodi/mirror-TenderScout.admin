import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
    selector: 'app-request-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements ViewCell, OnInit {

    public reqData;
    public blockBtn: boolean = false;

    @Input() value;

    constructor() {  }

    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        if(this.rowData && this.rowData.onlyProfile){
            for(let elem in this.rowData.profile){
                if(this.rowData.profile[elem] === null || this.rowData.profile[elem].length == 0 || this.rowData.profile[elem] === undefined) {
                    delete this.rowData.profile[elem];
                }
                /*if(typeof this.rowData.profile[elem] === 'object' && this.rowData.profile[elem] !== null) {
                    console.log(this.rowData.profile[elem]);//TODO: Delete
                }*/
            }
            if(!this.rowData.profile){
                this.blockBtn = true;
            }else{
                this.reqData = Object.keys(this.rowData.profile);
                this.rowData = this.rowData.profile;
            }
        } else {
            this.reqData = Object.keys(this.rowData);
        }
    }
}
