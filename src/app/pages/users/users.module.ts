import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SignupReqListComponent } from './components/signup-request-list/reqs-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DetailsComponent } from './components/signup-request-list/details/details.component';

// Import the library
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { SharedModule } from '../../modules/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule,
        TimezonePickerModule,
        ModalModule
    ],
    declarations: [
        UsersListComponent,
        SignupReqListComponent,
        CreateUserComponent,
        UsersListComponent,
        DetailsComponent,
    ],
    providers: [ ],
    entryComponents: [
        DetailsComponent
    ]
})
export class UsersModule {
}
