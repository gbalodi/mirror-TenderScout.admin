import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesComponent } from './components/countries/countries.component';

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
            }
        ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionariesRoutingModule {}
