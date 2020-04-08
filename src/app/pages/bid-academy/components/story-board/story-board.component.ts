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
            story_id: res.story.id,
            title: res.title,
            description: res.description,
            tags_attributes: _.map(res.tags, 'name')
          });
        })
      }
    })
  }

  public submitForm() {
    let method: string = !this.boardId ? 'createStoryBoard' : 'updateStoryBoard';
    let existingTags = _.filter(this.tags, (tag) => _.indexOf(this.storyBoardForm.value.tags_attributes, tag.name) > -1),
      story_boards_tags_attributes = _.map(existingTags, (tag) => { return { tag_id: tag.id } }),
      newTags = _.filter(this.storyBoardForm.value.tags_attributes, (tag) => _.indexOf(this.tagsArray, tag) === -1),
      tags_attributes = _.map(newTags, (tag) => { return { name: tag } }),
      req = {
        title: this.storyBoardForm.value.title,
        description: this.storyBoardForm.value.description,
        story_id: parseInt(this.storyBoardForm.value.story_id),
        tags_attributes: tags_attributes, // [{ name: "Test" }, { name: "Test" }],
        story_boards_tags_attributes: story_boards_tags_attributes // [{ tag_id: 43 }, { tag_id: 44 }]
      };
    this.bidAcademyService[method]({ story_board: req }, this.boardId ? this.boardId : undefined).subscribe((res: any) => {
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
