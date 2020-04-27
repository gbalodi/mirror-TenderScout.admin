import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidAcademyRoutingModule } from './bid-academy-routing.module';
import { StoryBoardComponent } from './components/story-board/story-board.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BidAcademyService } from './services/bid-academy.service';
import { StoryBoardsListComponent } from './components/story-boards-list/story-boards-list.component';
// import { StoryListComponent } from './components/story-list/story-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { TreeModule } from 'angular-tree-component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from 'app/modules/shared.module';
import { GroupTreeComponent } from './components/group/group-tree/group-tree.component';
import { GroupUsersListComponent } from './components/group/group-users-list/group-users-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';



@NgModule({
  imports: [
    CommonModule,
    BidAcademyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    TreeModule,
    NgxSpinnerModule,
    SharedModule,
    CKEditorModule
  ],
  declarations: [
    StoryBoardComponent,
    StoryBoardsListComponent,
    GroupListComponent,
    GroupTreeComponent,
    GroupUsersListComponent,
    CategoriesListComponent,
    // TreeViewComponent
  ],
  providers: [
    BidAcademyService
  ]
})
export class BidAcademyModule { }
