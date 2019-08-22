import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { SharedModule } from 'app/modules/shared.module';
import { FileDropModule } from 'ngx-file-drop';
import { TagInputModule } from 'ngx-chips';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TenderCompaniesInfoListComponent } from './components/tender-companies-info-list/tender-companies-info-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { CsvModule } from '@ctrl/ngx-csv';


@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    FileDropModule,
    TagInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    NgxPaginationModule,
    CsvModule
  ],
  declarations: [
    CompaniesListComponent,
    CreateCompanyComponent,
    TenderCompaniesInfoListComponent
  ]
})
export class CompaniesModule { }
