import { NgModule } from '@angular/core';
import { DictionariesRoutingModule } from './dictionaries-routing.module';
import { SharedModule } from '../../modules/shared.module';
import { CountriesComponent } from './components/countries/countries.component';

@NgModule({
    imports: [
        DictionariesRoutingModule,
        SharedModule
    ],
    declarations: [ CountriesComponent ],
})
export class DictionariesModule {
}
