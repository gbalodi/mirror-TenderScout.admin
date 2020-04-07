import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidAcademyRoutingModule } from './bid-academy-routing.module';
import { StoryBoardComponent } from './components/story-board/story-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BidAcademyService } from './services/bid-academy.service';
import { StoryBoardsListComponent } from './components/story-boards-list/story-boards-list.component';
// import { StoryListComponent } from './components/story-list/story-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    BidAcademyRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [
    StoryBoardComponent,
    StoryBoardsListComponent,
  ],
  providers: [
    BidAcademyService
  ]
})
export class BidAcademyModule { }
