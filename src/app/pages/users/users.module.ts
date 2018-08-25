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
import { StatusSwitcherComponent } from './components/signup-request-list/status-switcher/status-switcher.component';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule,
        TimezonePickerModule,
        ModalModule,
        UiSwitchModule,
    ],
    declarations: [
        UsersListComponent,
        SignupReqListComponent,
        CreateUserComponent,
        UsersListComponent,
        DetailsComponent,
        StatusSwitcherComponent
    ],
    providers: [ ],
    entryComponents: [
        DetailsComponent,
        StatusSwitcherComponent
    ]
})
export class UsersModule {
}
