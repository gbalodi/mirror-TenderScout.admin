import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SignupReqListComponent } from './components/signup-request-list/reqs-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Users'
        },
        children: [
            {
                path: 'list',
                component: UsersListComponent,
                data: {
                    title: 'Users list'
                }
            },
            {
                path: 'create',
                component: CreateUserComponent,
                data: {
                    title: 'Create user'
                }
            },
            {
                path: 'signup-requests',
                component: SignupReqListComponent,
                data: {
                    title: 'Sign up requests'
                }
            },
        ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
