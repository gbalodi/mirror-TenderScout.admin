import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

interface IGroupUser {
  id: number;
  user: {
    id: number;
    email: string;
    full_name: string;
  }
}

@Component({
  selector: 'app-group-users-list',
  templateUrl: './group-users-list.component.html',
  styleUrls: ['./group-users-list.component.scss']
})
export class GroupUsersListComponent implements OnInit {
  public groupUsers: IGroupUser[];
  public selectedGroupUser: IGroupUser;
  public bsModalRef: BsModalRef;
  public groupId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private bsModalService: BsModalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.groupId = params['id'];
        this._getStoryUsers();
      }
    })
  }

  public _getStoryUsers() {
    this.groupService.getStoryUsers(this.groupId).subscribe((res: any) => {
      res = JSON.parse(res);
      this.groupUsers = res;
    });
  }

  public openModal(template: TemplateRef<any>, item: any) {
    this.selectedGroupUser = item;
    this.bsModalRef = this.bsModalService.show(template, { class: `modal-lg archieve-modal` });
  }

  public deleteStoryUser() {
    this.groupService.deleteStoryUser(this.groupId, this.selectedGroupUser.user.id).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toastrService.success(res.success, 'Success');
      this.bsModalRef.hide();
      this._getStoryUsers();
    }, error => {
      console.error(error);
    });
  }

}
