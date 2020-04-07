import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../group.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  public groups: any;
  public bsModalRef: BsModalRef;
  public groupForm: FormGroup;
  public tableHeadNames: Array<string> = ['Edit', 'Name', 'Action'];

  constructor(
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private toastrService: ToastrService
  ) {
    this.groupForm = formBuilder.group({
      id: [null],
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
    this._getAllGroups();
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
    if (item) {
      this.groupForm.patchValue({
        id: item.id,
        name: item.name
      });
    }
    this.bsModalRef = this.bsModalService.show(template, { class: `modal-lg archieve-modal` });
  }

  public submitGroup() {
    let method: string = !this.groupForm.value.id ? 'createStories' : 'updateStories';
    let req = this.groupForm.value;
    if (method === 'createStories') {
      delete req.id;
    }

    this.groupService[method]({story : this.groupForm.value}, this.groupForm.value.id ? this.groupForm.value.id : undefined).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getAllGroups();
    }, error => {
      console.error(error);
    });
  }

  public deleteGroupEvent() {
    this.groupService.deleteStories(this.groupForm.value.id).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getAllGroups();
    }, error => {
      console.error(error);
    });
  }

}
