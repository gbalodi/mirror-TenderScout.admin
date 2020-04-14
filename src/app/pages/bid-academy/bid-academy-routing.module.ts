import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryBoardComponent } from './components/story-board/story-board.component';
import { StoryBoardsListComponent } from './components/story-boards-list/story-boards-list.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { GroupTreeComponent } from './components/group/group-tree/group-tree.component';
import { GroupUsersListComponent } from './components/group/group-users-list/group-users-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pathway'
    },
    children: [
      {
        path: 'sector-groups-list',
        component: GroupListComponent,
        data: {
          title: 'Sector Groups List'
        }
      },
      {
        path: 'story-group/:id/users',
        component: GroupUsersListComponent,
        data: {
          title: 'Sector Group Users List'
        }
      },
      {
        path: 'story-groups-tree',
        component: GroupTreeComponent,
        data: {
          title: 'Sector Groups Tree'
        }
      },

      {
        path: 'pathways-list',
        component: StoryBoardsListComponent,
        data: {
          title: 'Pathways List'
        }
      },
      {
        path: 'create-story-board',
        component: StoryBoardComponent,
        data: {
          title: 'Create Pathway'
        }
      },
      {
        path: 'edit-story-board/:id',
        component: StoryBoardComponent,
        data: {
          title: 'Edit Pathway'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidAcademyRoutingModule { }
