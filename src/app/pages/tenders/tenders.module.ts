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

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TendersRoutingModule,
        ModalModule,
        UiSwitchModule,
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
    ]
})
export class TendersModule { }
