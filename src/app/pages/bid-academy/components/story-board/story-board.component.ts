import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BidAcademyService } from '../../services/bid-academy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { GroupService } from '../group/group.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface IAttachFile {
  name: string;
  id?: number;
}

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
  @ViewChild('attachInput') public attachInput: ElementRef;
  public storyBoardForm: FormGroup | any;
  public boardId: number;
  public tags: ITags[];
  public tagsArray: string[];
  public groups: any;
  public uploadedFiles: Array<string> = [];
  public attachFiles: Array<IAttachFile> = [];
  public attachLoading: boolean = false;
  public Object: any = Object;
  public actions: { [key: string]: string } = {};
  public dropDownSettings = {
    singleSelection: false,
    idField: "id",
    textField: "name",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  public fileTypes: string[] = ['xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'];

  constructor(
    private formBuilder: FormBuilder,
    private bidAcademyService: BidAcademyService,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private spinner: NgxSpinnerService
  ) {
    this.storyBoardForm = formBuilder.group({
      id: [''],
      story_id: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags_attributes: [[], Validators.required],
      story_board_assets: [[]]
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
    this.spinner.show();
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
            tags_attributes: _.map(res.tags, 'name'),
            story_board_assets: res.story_board_assets
          });

          //  Set to Download/Attached files in the chat box...
          this._getActionDropDown();
        })
      }
    })
  }

  private _getActionDropDown() {
    if (this.storyBoardForm.value.story_board_assets) {
      this.actions = {};
      this.storyBoardForm.value.story_board_assets.forEach(element => {
        this.actions[element.file_name] = element.file_name;
      });
    }
  }

  public submitForm() {
    let method: string = !this.boardId ? 'createStoryBoard' : 'updateStoryBoard';
    let existingTags = _.filter(this.tags, (tag) => _.indexOf(this.storyBoardForm.value.tags_attributes, tag.name) > -1),
      story_boards_tags_attributes = _.map(existingTags, (tag) => { return { tag_id: tag.id } }),
      newTags = _.filter(this.storyBoardForm.value.tags_attributes, (tag) => _.indexOf(this.tagsArray, tag) === -1),
      tags_attributes = _.map(newTags, (tag) => { return { name: tag } }),
      story_boards_story_board_assets_attributes = _.map(this.attachFiles, (file) => { return { story_board_asset_id: file.id } }),
      req = {
        title: this.storyBoardForm.value.title,
        description: this.storyBoardForm.value.description,
        story_id: parseInt(this.storyBoardForm.value.story_id),
        tags_attributes: tags_attributes, // [{ name: "Test" }, { name: "Test" }],
        story_boards_tags_attributes: story_boards_tags_attributes, // [{ tag_id: 43 }, { tag_id: 44 }]
        story_boards_story_board_assets_attributes: story_boards_story_board_assets_attributes
      };
    this.bidAcademyService[method]({ story_board: req }, this.boardId ? this.boardId : undefined).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.router.navigate(['/bid-academy/pathways-list']);
    }, error => {
      console.error(error);
    });
  }

  public onSelectAll(items: any) {
    console.log(items);
  }

  /**
 * Handler attaching files type are valid/Not and request to be sent to upload those valid files...
 */
  public handlerAttachFile() {
    console.log(this.attachInput.nativeElement.files);
    const fileBrowser = this.attachInput.nativeElement;
    for (let i = 0; i < fileBrowser.files.length; i++) {
      let fileName = fileBrowser.files[i].name, getExtension = fileName.split("."),
        formData: FormData = new FormData(),
        validFile: boolean = this.validFileType(getExtension);
      if (validFile) {
        this.uploadedFiles.push(fileName.replace(/\s/g, "_"));
        this.attachFiles.push({ name: fileName.replace(/\s/g, "_"), id: null });
        formData.append(`story_board_asset[file]`, fileBrowser.files[i]);
        this.uploadAssistanceFile(formData);
      } else {
        this.toastrService.warning("File type should be any of these 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'", 'Warning');
      }
    }
  }

  public validFileType(getExtension) {
    if (this.fileTypes.find(fileType => fileType === getExtension[getExtension.length - 1].toLocaleLowerCase()) !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  public spinLoadHandler(item) {
    console.log(_.includes(this.uploadedFiles, item));
    return _.includes(this.uploadedFiles, item);
  }

  public deleteAssistanceFile(index, item) {
    this.attachFiles.splice(index, 1);
    this.attachInput.nativeElement.value = "";
    this.uploadedFiles = _.remove(this.uploadedFiles, item.name);
    this.deleteStoryBoardAssetFile(item.id);
  }

  public findSelectedFile(file) {
    let found = _.find(this.storyBoardForm.value.story_board_assets, ['file_name', file]);
    let deletedFile = _.pull(this.storyBoardForm.value.story_board_assets, found);

    this.storyBoardForm.controls['story_board_assets'].setValue(deletedFile);

    this.deleteStoryBoardAssetFile(found.id);
    this._getActionDropDown();
  }

  public deleteStoryBoardAssetFile(id) {
    this.bidAcademyService.deleteStoryBoardAssetFile(id).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
    }, error => {
      console.error(error);
    });
  }

  public uploadAssistanceFile(formData) {
    this.attachLoading = true;
    this.bidAcademyService.uploadStoryBoardAssetFile(formData).subscribe((res: any) => {
      res = JSON.parse(res);
      let fileIds: Array<number> = this.attachFiles.length ? _.map(this.attachFiles, 'id') : [];
      fileIds.push(res.id)
      _.set(_.find(this.attachFiles, { name: res.file_name }), 'id', res.id);
      this.uploadedFiles = _.pull(this.uploadedFiles, res.file_name);
      if (this.uploadedFiles.length === 0) {
        this.attachLoading = false;
      }
    }, error => {
      this.attachLoading = false;
      console.error(error);
    });
  }

  /**
* To Download Attached file...
* @param file 
*/
  public downloadFile(file) {
    let found = _.find(this.storyBoardForm.value.story_board_assets, ['file_name', file]);
    window.open(found.file_url, '_blank');
  }
}
