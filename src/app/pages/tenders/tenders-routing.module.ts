import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendersListComponent } from './components/tenders-list/tenders-list.component';
import { TenderDetailsComponent } from './components/tender-details/tender-details.component';

const routes: Routes = [
    {
        path: '',
        // component: TendersListComponent,
        data: {
            title: 'Tenders'
        },
        children: [
            {
                path: 'list',
                component: TendersListComponent,
                data: {
                    title: 'Tenders List'
                }
            },
            {
                path: 'details/:id',
                component: TenderDetailsComponent,
                data: {
                    title: 'Tenders Details'
                }
            }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TendersRoutingModule { }
