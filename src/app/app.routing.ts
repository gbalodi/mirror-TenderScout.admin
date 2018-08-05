import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './modules/authorization/services/auth-guard.service';

// Import Containers
import { FullLayoutComponent, SimpleLayoutComponent } from './containers';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [ AuthGuard ]
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
