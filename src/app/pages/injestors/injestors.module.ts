import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjestorsRoutingModule } from './injestors-routing.module';
import { InjestorsListComponent } from './components/injestors-list/injestors-list.component';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InjestorsRoutingModule,
    SharedModule
  ],
  declarations: [InjestorsListComponent]
})
export class InjestorsModule { }
