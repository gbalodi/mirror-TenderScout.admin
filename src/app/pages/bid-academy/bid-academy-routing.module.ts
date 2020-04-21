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
      title: 'Documents'
    },
    children: [
      {
        path: 'pathway-list',
        component: GroupListComponent,
        data: {
          title: 'Pathway List'
        }
      },
      {
        path: 'story-group/:id/users',
        component: GroupUsersListComponent,
        data: {
          title: 'Pathway Group Users List'
        }
      },
      {
        path: 'story-groups-tree',
        component: GroupTreeComponent,
        data: {
          title: 'Pathway Groups Tree'
        }
      },

      {
        path: 'documents-list',
        component: StoryBoardsListComponent,
        data: {
          title: 'Documents List'
        }
      },
      {
        path: 'create-story-board',
        component: StoryBoardComponent,
        data: {
          title: 'Create Document'
        }
      },
      {
        path: 'edit-story-board/:id',
        component: StoryBoardComponent,
        data: {
          title: 'Edit Document'
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
