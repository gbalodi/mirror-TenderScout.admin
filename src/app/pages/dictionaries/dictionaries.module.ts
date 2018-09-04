import { NgModule } from '@angular/core';
import { DictionariesRoutingModule } from './dictionaries-routing.module';
import { SharedModule } from '../../modules/shared.module';
import { CountriesComponent } from './components/countries/countries.component';
import { CodesComponent } from './components/codes/codes.component';
import { IndustriesComponent } from './components/industries/industries.component';

@NgModule({
    imports: [
        DictionariesRoutingModule,
        SharedModule
    ],
    declarations: [
        CountriesComponent,
        CodesComponent,
        IndustriesComponent,
    ],
})
export class DictionariesModule {
}
