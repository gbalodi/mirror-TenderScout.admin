import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClaimedComponent } from './components/list-claimed/list-claimed.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Claimed Companies'
    },
    children: [
      {
        path: '',
        component: ListClaimedComponent,
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
export class ClaimedCompaniesRoutingModule { }
