import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRequestService } from '../services/main-request.service';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { DocumentsComponent } from './components/documents/documents.component';
import { DropdownActionsComponent } from './components/dropdown-actions/dropdown-actions.component';
import { KeysPipe } from './pipes/keys.pipe';
import { FileDropModule } from 'ngx-file-drop';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { DropdownListComponent } from './components/dropdown-list/dropdown-list.component';
import { InputErrorsComponent } from './components/input-errors/input-errors.component';
import { TagInputModule } from 'ngx-chips';
import { SelectComponent } from './components/select/select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { KeyValuePipe } from '../pipe/key-value.pipe';
import { FileUploaderComponent } from '../file-uploader.component';
import { FileUploaderService } from '../file-uploader.service';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { MessageComponent } from './components/chat-box/message/message.component';
import { MessageTypeComponent } from './components/chat-box/message-type/message-type.component';
import { CustomTitlePipe } from 'app/pipe/custom-title.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        ModalModule.forRoot(),
        PaginationModule,
        FileDropModule,
        TagInputModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    providers: [
        MainRequestService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        FileUploaderService
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        ModalModule,
        PaginationModule,
        DocumentsComponent,
        DropdownActionsComponent,
        KeysPipe,
        InputDropdownComponent,
        DropdownListComponent,
        InputErrorsComponent,
        SelectComponent,
        KeyValuePipe,
        FileUploaderComponent,
        ChatBoxComponent,
        MessageComponent,
        MessageTypeComponent,
        CustomTitlePipe
    ],
    declarations: [
        DocumentsComponent,
        DropdownActionsComponent,
        KeysPipe,
        UserFilterPipe,
        InputDropdownComponent,
        DropdownListComponent,
        InputErrorsComponent,
        SelectComponent,
        KeyValuePipe,
        FileUploaderComponent,
        ChatBoxComponent,
        MessageComponent,
        MessageTypeComponent,
        CustomTitlePipe
    ],
})
export class SharedModule { }
