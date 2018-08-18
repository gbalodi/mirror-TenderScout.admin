import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRequestService } from '../services/main-request.service';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { HttpInterceptorService } from '../services/http-interceptor.service';
import { DictionariesRoutingModule } from '../pages/dictionaries/dictionaries-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
        CommonModule,
        DictionariesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
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
        DictionariesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
    ]
})
export class SharedModule { }
