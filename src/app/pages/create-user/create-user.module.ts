import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
// Import the library
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { MainRequestService } from '../../services/main-request.service';

@NgModule({
    imports: [
        CommonModule,
        CreateUserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TimezonePickerModule
    ],
    declarations: [ CreateUserComponent ],
    providers: [ MainRequestService ]
})
export class CreateUserModule {
}
