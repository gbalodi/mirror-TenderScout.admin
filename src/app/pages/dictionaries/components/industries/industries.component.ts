import {Component, OnInit} from '@angular/core';
import {MainRequestService} from '../../../../services/main-request.service';

@Component({
    selector: 'app-countries',
    templateUrl: './industries.component.html',
    styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {

    constructor(
        private request: MainRequestService,
    ) {
    }

    public industriesDict;
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
            name: {
                title: 'Name'
            },
        }
    };

    ngOnInit() {
        this.request.getData('v1/dictionaries/industries').subscribe(res => {
            console.log('res', res);
            this.industriesDict = JSON.parse(res);
        })
    }

}
