import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingDocumentsRoutingModule } from './training-documents-routing.module';
import { BsModalRef, ModalModule } from 'ngx-bootstrap';
import { FileUploaderService } from '../../file-uploader.service';
import { SharedModule } from '../../modules/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileDropModule } from 'ngx-file-drop';
import { TrainingDocsListComponent } from './components/training-docs-list/training-docs-list.component';
import { FileUploaderComponent } from '../../file-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    TrainingDocumentsRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FileDropModule
  ],
  declarations: [
    TrainingDocsListComponent,
    // FileUploaderComponent
  ],
  providers:[
    BsModalRef,
    // FileUploaderService
  ]
})
export class TrainingDocumentsModule { }
