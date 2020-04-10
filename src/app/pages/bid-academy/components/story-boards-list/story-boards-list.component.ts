import { Component, OnInit, TemplateRef } from '@angular/core';
import { BidAcademyService } from '../../services/bid-academy.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

interface IStoryBoard {
  id: number;
  title: string;
  description: string;
  tags: Array<string>;
  read: boolean;
  story_board_assets: Array<any>;
}

@Component({
  selector: 'app-story-boards-list',
  templateUrl: './story-boards-list.component.html',
  styleUrls: ['./story-boards-list.component.scss']
})
export class StoryBoardsListComponent implements OnInit {
  public storyBoardsList: IStoryBoard[] = [];
  public selectedBoard: IStoryBoard;
  public approveModal: BsModalRef;
  public tableHeadNames: Array<string> = ['Edit', 'Title', 'Description', 'Tags', '# Attach(s)', 'Action'];

  constructor(
    private bidAcademyService: BidAcademyService,
    private bsModalService: BsModalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this._getAllStoryBoards();
  }

  private _getAllStoryBoards() {
    this.bidAcademyService.getAllStoryBoards().subscribe((res: any) => {
      res = JSON.parse(res);
      this.storyBoardsList = res;
    }, error => {
      console.error(error);
    });
  }

  public openModal(template: TemplateRef<any>, item: any) {
    this.selectedBoard = item;
    this.approveModal = this.bsModalService.show(template, { class: `modal-lg archieve-modal` });
  }


  public deleteBoardEvent() {
    this.bidAcademyService.deleteStoryBoard(this.selectedBoard.id).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this._getAllStoryBoards();
      this.approveModal.hide();
    }, error => {
      console.error(error);
    });
  }

  public tagHandler(tags) {
    let t = _.map(tags, 'name');

    return t.join(', ')
  }

}
