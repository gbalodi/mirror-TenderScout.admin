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

import { UsersService } from './components/services/users.service';
import { UploadFileComponent } from './components/signup-request-list/upload-file/upload-file.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CsvModule } from '@ctrl/ngx-csv';
import { RatingRequestComponent } from './components/rating-request/rating-request.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersArchiveListComponent } from './components/users-archive-list/users-archive-list.component';
import { DialogComponent } from './components/users-archive-list/dialog/dialog.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule,
        TimezonePickerModule,
        ModalModule,
        UiSwitchModule,
        NgSelectModule,
        HighchartsChartModule,
        NgxPaginationModule,
        CsvModule,
        NgbRatingModule
    ],
    declarations: [
        UsersListComponent,
        SignupReqListComponent,
        CreateUserComponent,
        DetailsComponent,
        StatusSwitcherComponent,
        RequestAssistanceComponent,
        RequestUpgradeComponent,
        UserInfoComponent,
        AcceptRequestComponent,
        UploadFileComponent,
        UserStatisticsComponent,
        RatingRequestComponent,
        UsersArchiveListComponent,
        DialogComponent,
    ],
    providers: [
        UsersService,
    ],
    entryComponents: [
        DetailsComponent,
        StatusSwitcherComponent,
        UserInfoComponent,
        AcceptRequestComponent,
        UploadFileComponent,
        DialogComponent
    ]
})
export class UsersModule {
}
