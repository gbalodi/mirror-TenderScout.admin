import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesComponent } from './components/countries/countries.component';
import { CodesComponent } from './components/codes/codes.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Dictionaries'
        },
        children: [
            {
                path: 'countries',
                component: CountriesComponent,
                data: {
                    title: 'Countries dictionary'
                }
            },
            {
                path: 'codes',
                component: CodesComponent,
                data: {
                    title: 'Codes dictionary'
                }
            }
        ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionariesRoutingModule {}
