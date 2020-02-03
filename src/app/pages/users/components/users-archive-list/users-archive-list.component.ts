import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { UsersService } from '../services/users.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { MainRequestService } from '../../../../services/main-request.service';

@Component({
  selector: 'app-users-archive-list',
  templateUrl: './users-archive-list.component.html',
  styleUrls: ['./users-archive-list.component.scss']
})
export class UsersArchiveListComponent implements OnInit {
  public source: LocalDataSource = new LocalDataSource();
  public itemsPerPage: number = 20;
  public totalItems: number;
  public maxSize: number = 5;

  public settings = {
    mode: 'inline',
    pager: { display: true, perPage: 20 },
    edit: {
      confirmSave: false,
    },
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    columns: {
      id: {
        title: 'ID',
        editable: false
      },
      email: {
        title: 'Email',
        editable: true
      },
      profile_type: {
        title: 'Profile type',
        editable: false
      },
      role: {
        title: 'Role',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'admin', title: 'admin' },
              { value: 'standard', title: 'standard' },
              { value: 'basic', title: 'basic' },
              { value: 'free', title: 'free' },
            ]
          }
        },
      },
      profile: {
        title: 'Details',
        type: 'custom',
        editable: false,
        filter: false,
        sort: false,
        renderComponent: DialogComponent,
      }
    }
  };

  constructor(
    private usersService: UsersService,
    private toasterService: ToastrService,
    private mainRequestService: MainRequestService
  ) {
    this.usersService.loading$.subscribe(res => {
      if (res) {
        this.getArchiveUsers();
        this.usersService.loading$.next(false);
      }
    })
  }

  ngOnInit() {
    this.getArchiveUsers();
  }

  public getArchiveUsers() {
    this.usersService.getArchiveUsers().subscribe((res: any) => {
      res = JSON.parse(res);

      this.source.setPaging(1, this.itemsPerPage, true);
      this.source.load(res.data);
      this.totalItems = res.count;
    }, error => {
      console.log(error);
    });
  }

  public onEditConfirm(event): void {
    if (event.data.role !== event.newData.role) {
      this.mainRequestService.putData(`v1/users/${event.data.id}/change_user_role`, { role: event.newData.role }).subscribe(() => {
        this.toasterService.success('Successful operation', 'Success');
        event.confirm.resolve();
      }, () => {
        this.toasterService.error('Ooops, error', 'Try again');
        event.confirm.reject();
      });
    }
  }

}
