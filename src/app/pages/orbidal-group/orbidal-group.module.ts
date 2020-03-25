import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { OrbidalGroupRoutingModule } from './orbidal-group-routing';
import { SharedModule } from 'app/modules/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    OrbidalGroupRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  declarations: [GroupsListComponent]
})
export class OrbidalGroupModule { }
