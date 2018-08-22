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
            },
            {
                path: 'create-user',
                loadChildren: './pages/create-user/create-user.module#CreateUserModule'
            },
            {
                path: 'users-list',
                loadChildren: './pages/users-list/users-list.module#UsersListModule'
            },
            {
                path: 'countries-dict',
                loadChildren: './pages/dictionaries/dictionaries.module#DictionariesModule'
            },
            {
                path: 'signup-reqs-list',
                loadChildren: './pages/signup-req/signup-req.module#SignupReqModule'
            },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
