import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReqsListComponent } from './components/reqs-list/reqs-list.component';


const routes: Routes = [
  {
    path: '',
    component: ReqsListComponent,
    data: {
      title: 'Sign-up Requests list'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupReqRoutingModule {}
