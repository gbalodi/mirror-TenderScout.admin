import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsListComponent } from './components/groups-list/groups-list.component';

const routes: Routes = [
    {
        path: '',
        component: GroupsListComponent,
        data: {
            title: 'Orbidal Group'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrbidalGroupRoutingModule { }
