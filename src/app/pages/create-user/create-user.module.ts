import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { CreateUserRoutingModule } from './create-user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CreateUserRoutingModule
    ],
    declarations: [ CreateUserComponent ]
})
export class CreateUserModule {
}
