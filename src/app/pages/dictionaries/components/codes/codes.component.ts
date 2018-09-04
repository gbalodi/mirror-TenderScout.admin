import {Component, OnInit} from '@angular/core';
import {MainRequestService} from '../../../../services/main-request.service';

@Component({
    selector: 'app-countries',
    templateUrl: './codes.component.html',
    styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {

    constructor(
        private request: MainRequestService,
    ) {
    }

    public countriesDict;
    public settings = {
        actions: {
            delete: false,
            add: false,
            edit: false
        },
        columns: {
            id: {
                title: 'ID'
            },
            code: {
                title: 'Code'
            },
            description: {
                title: 'Description'
            },
            code_name: {
                title: 'Code name'
            },
        }
    };

    ngOnInit() {
        this.request.getData('v1/dictionaries/all_codes').subscribe(res => {
            console.log('res', res);
            this.countriesDict = JSON.parse(res);
        })
    }

}
