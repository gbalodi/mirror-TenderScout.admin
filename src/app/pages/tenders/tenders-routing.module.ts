import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendersListComponent } from './components/tenders-list/tenders-list.component';
import { TenderDetailsComponent } from './components/tender-details/tender-details.component';
import { TenderEditComponent } from './components/tender-edit/tender-edit.component';

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
            },
            {
                path: 'edit/:id',
                component: TenderEditComponent,
                data: {
                    title: 'Tenders Edit'
                }
            },
            {
                path: 'create',
                component: TenderEditComponent,
                data: {
                    title: 'Tenders Create'
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
