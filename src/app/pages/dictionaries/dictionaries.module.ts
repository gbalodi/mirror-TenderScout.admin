import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CountriesComponent } from './components/countries/countries.component';
import { DictionariesRoutingModule } from './dictionaries-routing.module';
// Import the library
import { MainRequestService } from '../../services/main-request.service';

@NgModule({
    imports: [
        CommonModule,
        DictionariesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [ CountriesComponent ],
    providers: [ MainRequestService ]
})
export class DictionariesModule {
}
