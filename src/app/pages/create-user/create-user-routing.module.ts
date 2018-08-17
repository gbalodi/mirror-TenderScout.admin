import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserComponent } from './components/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: CreateUserComponent,
    data: {
      title: 'Create User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUserRoutingModule {}
