import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingDocsListComponent } from './components/training-docs-list/training-docs-list.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingDocsListComponent,
    data: {
      title: 'Training Documents'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingDocumentsRoutingModule { }
