import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesContactsRoutingModule } from './companies-contacts-routing.module';
import { SharedModule } from 'app/modules/shared.module';
import { FileDropModule } from 'ngx-file-drop';
import { TagInputModule } from 'ngx-chips';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { CsvModule } from '@ctrl/ngx-csv';
import { TenderCompaniesInfoListComponent } from './components/tender-companies-info-list/tender-companies-info-list.component';


@NgModule({
  imports: [
    CommonModule,
    CompaniesContactsRoutingModule,
    SharedModule,
    FileDropModule,
    TagInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    NgxPaginationModule,
    CsvModule
  ],
  declarations: [
    TenderCompaniesInfoListComponent
  ]
})
export class CompaniesContactsModule { }
