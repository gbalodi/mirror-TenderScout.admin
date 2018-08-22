import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqsListComponent } from './components/reqs-list/reqs-list.component';
import { SignupReqRoutingModule } from './signup-req-routing.module';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SignupReqRoutingModule,
        SharedModule,
    ],
    declarations: [ReqsListComponent]
})
export class SignupReqModule {
}
