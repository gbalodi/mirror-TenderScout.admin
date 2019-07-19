import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: DocumentsListComponent,
    data: {
        title: 'Documents List'
    },

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
