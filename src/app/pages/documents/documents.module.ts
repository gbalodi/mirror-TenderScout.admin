import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../../modules/shared.module';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploaderService } from '../../file-uploader.service';
import { FileUploaderComponent } from '../../file-uploader.component';
import { FileDropModule } from 'ngx-file-drop';



@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FileDropModule
  ],
  declarations: [
    DocumentsListComponent,
    FileUploaderComponent
  ],
  providers: [
    BsModalRef,
    FileUploaderService
  ],
  entryComponents: [
    
  ]
})
export class DocumentsModule { }
