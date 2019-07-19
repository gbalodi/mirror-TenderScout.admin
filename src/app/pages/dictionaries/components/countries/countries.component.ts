import {Component, OnInit} from '@angular/core';
import {MainRequestService} from '../../../../services/main-request.service';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

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
            name: {
                title: 'Name'
            },
            number: {
                title: 'Number'
            },
            code: {
                title: 'Code'
            },
            currency_id: {
                title: 'Currency ID'
            },
            world_region: {
                title: 'World region'
            },
            world_region_id: {
                title: 'World region ID'
            },
            alpha2code: {
                title: 'Alpha2 code'
            },
            alpha3code: {
                title: 'Alpha3 code'
            },
        }
    };

    ngOnInit() {
        this.request.getData('v1/dictionaries/countries').subscribe(res => {
            console.log('res', res);
            this.countriesDict = JSON.parse(res);
        })
    }

}
