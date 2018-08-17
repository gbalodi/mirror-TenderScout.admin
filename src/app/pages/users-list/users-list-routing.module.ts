import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { UsersListComponent } from './components/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      title: 'Users list'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersListRoutingModule {}
