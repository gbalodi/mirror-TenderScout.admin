import { NgModule } from '@angular/core';
import { CountriesComponent } from './components/countries/countries.component';
import { DictionariesRoutingModule } from './dictionaries-routing.module';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
    imports: [
        DictionariesRoutingModule,
        SharedModule
    ],
    declarations: [ CountriesComponent ],
})
export class DictionariesModule {
}
