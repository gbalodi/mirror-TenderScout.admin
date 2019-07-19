import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../../modules/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    DocumentsListComponent
  ]
})
export class DocumentsModule { }
