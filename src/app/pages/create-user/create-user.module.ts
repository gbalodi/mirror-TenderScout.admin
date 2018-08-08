import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
// Import the library
import { TimezonePickerModule } from 'ng2-timezone-selector';

@NgModule({
    imports: [
        CommonModule,
        CreateUserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TimezonePickerModule
    ],
    declarations: [ CreateUserComponent ]
})
export class CreateUserModule {
}
