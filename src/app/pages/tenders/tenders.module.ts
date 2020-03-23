import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared.module';
import { TendersRoutingModule } from '../tenders/tenders-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { TendersListComponent } from './components/tenders-list/tenders-list.component';
import { DetailsComponent } from './components/tenders-list/details/details.component';
import { TenderDetailsComponent } from './components/tender-details/tender-details.component';
import { TenderService } from './services/tender.service';
import { TenderEditComponent } from './components/tender-edit/tender-edit.component';
import { EditTenderButtonComponent } from './components/tenders-list/edit-tender-button/edit-tender-button.component';
// import { DpDatePickerModule } from 'ng2-date-picker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TendersRoutingModule,
        ModalModule,
        UiSwitchModule,
        BsDatepickerModule.forRoot(),
        NgSelectModule
    ],
    declarations: [
        TendersListComponent,
        DetailsComponent,
        TenderDetailsComponent,
        TenderEditComponent,
        EditTenderButtonComponent,
    ],
    entryComponents: [
        DetailsComponent,
        EditTenderButtonComponent
    ],
    providers: [
        TenderService
    ],
    exports: [
        // DpDatePickerModule
    ]
})
export class TendersModule { }
