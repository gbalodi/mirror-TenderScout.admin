import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './components/users-list.component';
import { UsersListRoutingModule } from './users-list-routing.module';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
// Import the library
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { MainRequestService } from '../../services/main-request.service';
import { HttpInterceptorService } from '../../services/http-interceptor.service'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        UsersListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        TimezonePickerModule,
    ],
    declarations: [ UsersListComponent ],
    providers: [
        MainRequestService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
    ]
})
export class UsersListModule {
}
