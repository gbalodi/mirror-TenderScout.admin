import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BidAcademyService } from '../../services/bid-academy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { GroupService } from '../group/group.service';

interface ITags {
  id: number;
  name: string;
}

@Component({
  selector: 'app-story-board',
  templateUrl: './story-board.component.html',
  styleUrls: ['./story-board.component.scss']
})
export class StoryBoardComponent implements OnInit {
  public storyBoardForm: FormGroup | any;
  public boardId: number;
  public tags: ITags[];
  public tagsArray: string[];
  public groups: any;
  public dropDownSettings = {
    singleSelection: false,
    idField: "id",
    textField: "name",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  constructor(
    private formBuilder: FormBuilder,
    private bidAcademyService: BidAcademyService,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.storyBoardForm = formBuilder.group({
      id: [''],
      story_id: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags_attributes: [[], Validators.required]
    });

    this.bidAcademyService.getAllTagLabels().subscribe((res: any) => {
      res = JSON.parse(res);
      this.tags = res;
      this.tagsArray = _.map(this.tags, 'name');
    }, error => {
      console.error(error);
    });

    this.groupService.getAllStories().subscribe((res: any) => {
      res = JSON.parse(res);
      this.groups = res;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.boardId = params.id;
        this.bidAcademyService.getStoryBoardById(params['id']).subscribe((res: any) => {
          res = JSON.parse(res);
          this.storyBoardForm.patchValue({
            id: res.id,
            story_id: res.story_id,
            title: res.title,
            description: res.description,
            tags_attributes: res.tags_attributes
          });
        })
      }
    })
  }

  public submitForm() {
    let method: string = !this.boardId ? 'createStoryBoard' : 'updateStoryBoard';
    let req = this.storyBoardForm.value;
    delete req.id;
    req.story_id = parseInt(req.story_id);
    this.bidAcademyService[method]({ story_board: this.storyBoardForm.value }, this.boardId ? this.boardId : undefined).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.router.navigate(['/bid-academy/story-boards-list']);
    }, error => {
      console.error(error);
    });
  }

  public onSelectAll(items: any) {
    console.log(items);
  }
}
