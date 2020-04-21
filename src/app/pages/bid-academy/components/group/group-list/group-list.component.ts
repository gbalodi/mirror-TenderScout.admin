import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../group.service';
import { ToastrService } from 'ngx-toastr';
import { DocumentsListService } from 'app/pages/documents/components/documents-list/documents-list.service';
import * as _ from 'lodash';

interface IStoryGroup {
  id: number;
  name: string;
  description: string;
  story_boards_count: number;
  archive: boolean;
  story_users_count: number;
  default: boolean;
}

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  public groups: IStoryGroup[];
  public bsModalRef: BsModalRef;
  public groupForm: FormGroup;
  public includeUsersForm: FormGroup;
  public usersList: Array<any> = [];
  public selectedUsers = [];
  public loading: boolean = false;
  // public tableHeadNames: Array<string> = ['Edit', 'Name', '#Story Board(s)', 'Action'];
  public dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private toastrService: ToastrService,
    private documentsListService: DocumentsListService
  ) {
    this.groupForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      default: [false],
      archive: [false]
    });

    this.includeUsersForm = formBuilder.group({
      story_ids: ['', Validators.required],
      user_ids: ['', Validators.required]
    })
  }

  ngOnInit() {
    this._getAllGroups();
    this._getUsersInfoService();
  }

  /**
 * Service call to get users Info list...
 */
  private _getUsersInfoService() {
    this.documentsListService.getUsersInfo().subscribe((res: any) => {
      res = JSON.parse(res);
      this.usersList = res.data;
    }, error => {
      this.usersList = [];
      console.log(error);
    });
  }

  private _getAllGroups() {
    this.groupService.getAllStories().subscribe((res: any) => {
      res = JSON.parse(res);
      this.groups = res;
    }, error => {
      console.error(error);
    });
  }

  public openModal(template: TemplateRef<any>, item: any) {
    this.groupForm.reset();
    this.includeUsersForm.reset();
    if (item) {
      this.groupForm.patchValue({
        id: item.id,
        name: item.name,
        description: item.description,
        default: item.default,
        archive: item.archive
      });
    }
    this.bsModalRef = this.bsModalService.show(template, { class: `modal-lg archieve-modal` });
  }

  public submitGroup() {
    this.loading = true;
    let method: string = !this.groupForm.value.id ? 'createStories' : 'updateStories';
    let req = { ...this.groupForm.value };
    delete req.id;

    this.groupService[method]({ story: req }, this.groupForm.value.id ? this.groupForm.value.id : undefined).subscribe((res: any) => {
      res = JSON.parse(res);
      this.loading = false;
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getAllGroups();
    }, error => {
      console.error(error);
    });
  }

  public archiveStory() {
    this.groupService.archiveStory(this.groupForm.value.id, { story: { archive: !this.groupForm.value.archive } }).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getAllGroups();
    }, error => {
      console.error(error);
    });
  }

  public deleteStory() {
    this.groupService.deleteStories(this.groupForm.value.id).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getAllGroups();
    }, error => {
      console.error(error);
    });
  }

  public includeUsersEvent() {
    console.log(this.includeUsersForm.value);

    let req = {
      user: {
        user_ids: _.map(this.includeUsersForm.value.user_ids, 'id'),
        story_ids: _.map(this.includeUsersForm.value.story_ids, 'id')
      }
    };

    this.groupService.includeUsers(req).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
    }, error => {
      console.error(error);
    });
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onSelectAll(items: any) {
    console.log(items);
  }

  // public getStoryUsers(id) {
  //   this.groupService.getStoryUsers(id).subscribe((res: any) => {
  //     res = JSON.parse(res);
  //   }, error => {
  //     console.error(error);
  //   });
  // }

}
