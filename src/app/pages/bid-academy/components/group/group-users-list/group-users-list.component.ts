import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-users-list',
  templateUrl: './group-users-list.component.html',
  styleUrls: ['./group-users-list.component.scss']
})
export class GroupUsersListComponent implements OnInit {
  public groupUsers: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.groupService.getStoryUsers(params['id']).subscribe((res: any) => {
          res = JSON.parse(res);
          this.groupUsers = res;
        });
      }
    })
  }

}
