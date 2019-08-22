import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { TenderCompaniesInfoListComponent } from './components/tender-companies-info-list/tender-companies-info-list.component';

const routes: Routes = [
  {
      path: '',
      data: {
          title: 'Companies'
      },
      children: [
          {
              path: 'list',
              component: CompaniesListComponent,
              data: {
                  title: 'Companies list'
              }
          },
          {
              path: 'create',
              component: CreateCompanyComponent,
              data: {
                  title: 'Create Company'
              }
          },
          {
            path: 'companies-contacts',
            component: TenderCompaniesInfoListComponent,
            data: {
                title: 'Tender Companies List'
            }
        }
          // {
          //     path: ':id/edit',
          //     component: CreateUserComponent,
          //     data: {
          //         title: 'Edit user'
          //     }
          // }
      ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
