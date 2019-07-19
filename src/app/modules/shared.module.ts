import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRequestService } from '../services/main-request.service';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { DocumentsComponent } from './components/documents/documents.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        ModalModule,
        PaginationModule
    ],
    providers: [
        MainRequestService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        ModalModule,
        PaginationModule,
        DocumentsComponent
    ],
    declarations: [
        DocumentsComponent
    ],
})
export class SharedModule { }
