import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimedCompaniesRoutingModule } from './claimed-companies-routing.module';
import { SharedModule } from '../../modules/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListClaimedComponent } from './components/list-claimed/list-claimed.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap';
import { ActionsModalComponent } from './components/actions-modal/actions-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ClaimedCompaniesRoutingModule,
    SharedModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    ListClaimedComponent,
    ActionsModalComponent
  ],
  entryComponents: [
    ActionsModalComponent
  ],
  providers: [BsModalRef]
})
export class ClaimedCompaniesModule { }
