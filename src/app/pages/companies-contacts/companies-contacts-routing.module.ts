import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenderCompaniesInfoListComponent } from './components/tender-companies-info-list/tender-companies-info-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Companies Contacts'
        },
        children: [
            {
                path: '',
                component: TenderCompaniesInfoListComponent,
                data: {
                    title: 'List'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesContactsRoutingModule { }
