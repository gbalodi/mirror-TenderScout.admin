import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendersListComponent } from './components/tenders-list/tenders-list.component';

const routes: Routes = [
    {
        path: '',
        component: TendersListComponent,
        data: {
            title: 'Users'
        },

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TendersRoutingModule {}
