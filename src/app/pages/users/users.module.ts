import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the library
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { SharedModule } from '../../modules/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { UsersListComponent } from './components/users-list/users-list.component';
import { SignupReqListComponent } from './components/signup-request-list/reqs-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DetailsComponent } from './components/signup-request-list/details/details.component';
import { StatusSwitcherComponent } from './components/signup-request-list/status-switcher/status-switcher.component';
import { RequestAssistanceComponent } from './components/request-assistance/request-assistance.component';
import { RequestUpgradeComponent } from './components/request-upgrade/request-upgrade.component';
import { UserInfoComponent } from './components/request-upgrade/user-info/user-info.component';
import { AcceptRequestComponent } from './components/request-upgrade/accept-request/accept-request.component';


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
        StatusSwitcherComponent,
        RequestAssistanceComponent,
        RequestUpgradeComponent,
        UserInfoComponent,
        AcceptRequestComponent,
    ],
    providers: [ ],
    entryComponents: [
        DetailsComponent,
        StatusSwitcherComponent,
        UserInfoComponent,
        AcceptRequestComponent,
    ]
})
export class UsersModule {
}
