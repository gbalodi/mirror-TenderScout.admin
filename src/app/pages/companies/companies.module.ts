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
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CompaniesStatisticsComponent } from './components/companies-statistics/companies-statistics.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';


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
    CsvModule,
    Ng2SmartTableModule
  ],
  declarations: [
    CompaniesListComponent,
    CreateCompanyComponent,
    TenderCompaniesInfoListComponent,
    CompaniesStatisticsComponent,
    GroupsListComponent
  ]
})
export class CompaniesModule { }
