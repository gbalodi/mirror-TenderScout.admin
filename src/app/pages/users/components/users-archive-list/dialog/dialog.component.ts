import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public reqData;
  @ViewChild('archiveUserModal') archiveUserModal;

  @Input() value;

  constructor(
    private usersService: UsersService,
    private toasterService: ToastrService
  ) { }

  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.rowData;
  }

  /**
  * API service call to set a user as Archive...
  */
  public archiveUserEvent() {
    let request = {
      status: 'active'
    };
    this.usersService.archiveUser(this.rowData.id, request).subscribe((res: any) => {
      res = JSON.parse(res);
      if (res.success) {
        this.toasterService.success(`User successfully Activated.`, 'Success');
      }
      this.usersService.loading$.next(true);
      this.archiveUserModal.hide();
    }, error => {
      console.log(error);
    });
  }

}
