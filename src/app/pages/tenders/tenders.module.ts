import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared.module';
import { TendersRoutingModule } from '../tenders/tenders-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { TendersListComponent } from './components/tenders-list/tenders-list.component';
import { DetailsComponent } from './components/tenders-list/details/details.component';

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
    ],
    entryComponents: [
        DetailsComponent,
    ]
})
export class TendersModule { }
