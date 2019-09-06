import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InjestorsListComponent } from './components/injestors-list/injestors-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: InjestorsListComponent,
    data: {
      title: 'Ingestors Status'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InjestorsRoutingModule { }
