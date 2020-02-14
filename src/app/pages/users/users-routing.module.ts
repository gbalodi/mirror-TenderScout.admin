import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SignupReqListComponent } from './components/signup-request-list/reqs-list.component';
import { RequestAssistanceComponent } from './components/request-assistance/request-assistance.component';
import { RequestUpgradeComponent } from './components/request-upgrade/request-upgrade.component';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { RatingRequestComponent } from './components/rating-request/rating-request.component';
import { UsersArchiveListComponent } from './components/users-archive-list/users-archive-list.component';

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
                path: 'statistics',
                component: UserStatisticsComponent,
                data: {
                    title: 'Users Statistics'
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
                path: ':id/edit',
                component: CreateUserComponent,
                data: {
                    title: 'Edit user'
                }
            },
            {
                path: 'signup-requests',
                component: SignupReqListComponent,
                data: {
                    title: 'Sign up requests'
                }
            },
            {
                path: 'assist-requests',
                component: RequestAssistanceComponent,
                data: {
                    title: 'Assistance requests'
                }
            },
            {
                path: 'upgrade-requests',
                component: RequestUpgradeComponent,
                data: {
                    title: 'User upgrade requests'
                }
            },
            {
                path: 'rating-request',
                component: RatingRequestComponent,
                data: {
                    title: 'Bid-Hub Rating Requests'
                }
            },
            {
                path: 'archives',
                component: UsersArchiveListComponent,
                data: {
                    title: 'Users Archive list'
                }
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
