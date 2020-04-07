import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryBoardComponent } from './components/story-board/story-board.component';
import { StoryBoardsListComponent } from './components/story-boards-list/story-boards-list.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Story Board'
    },
    children: [
      {
        path: 'story-groups-list',
        component: GroupListComponent,
        data: {
          title: 'Story Groups List'
        }
      },

      {
        path: 'story-boards-list',
        component: StoryBoardsListComponent,
        data: {
          title: 'Story Boards List'
        }
      },
      {
        path: 'create-story-board',
        component: StoryBoardComponent,
        data: {
          title: 'Create Story Board'
        }
      },
      {
        path: 'edit-story-board/:id',
        component: StoryBoardComponent,
        data: {
          title: 'Edit Story Board'
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
