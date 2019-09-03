import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClaimedService } from '../../services/claimed.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActionsModalComponent } from '../actions-modal/actions-modal.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-list-claimed',
  templateUrl: './list-claimed.component.html',
  styleUrls: ['./list-claimed.component.scss']
})

export class ListClaimedComponent implements OnInit {
  public page: number = 1;
  public totalData: number = 0;
  public claimsList: Array<any> = [];
  public approveModal: BsModalRef;
  public selectedClaimedId: number;
  public isApprove: boolean;
  public source: LocalDataSource = new LocalDataSource();
  public settings = {
    // hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    pager: { display: true, perPage: 20 },
    columns: {
      user_name: {
        title: 'User Name',
        editable: false
      },
      user_email: {
        title: 'User Email',
        editable: true
      },
      company_name: {
        title: 'Company Name',
        editable: false
      },
      status: {
        title: 'Status',
        editable: false,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'pending', title: 'pending' },
              { value: 'approved', title: 'approved' },
              { value: 'rejected', title: 'rejected' }
            ]
          }
        },
      },
      profile: {
        title: 'Actions',
        type: 'custom',
        editable: false,
        filter: false,
        sort: false,
        renderComponent: ActionsModalComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe(row => {
            this.getClaimsList();
            //now you can access value from child component here
          });
        }
      }
    }
  };

  constructor(
    private claimedService: ClaimedService,
    private bsModalService: BsModalService,
    private toasterService: ToastrService
  ) {
    // // Bootstrap modal On closed/hide/hidden... 
    this.bsModalService.onHide.subscribe(result => {
      this.selectedClaimedId = undefined;
    });
  }

  ngOnInit() {
    this.getClaimsList();
  }

  /**
   * API service call to get claims... 
   */
  public getClaimsList() {
    this.claimedService.getClaimsList(this.page).subscribe((res: any) => {
      res = JSON.parse(res);
      this.claimsList = res;
      this.source.setPaging(1, 20, true);
      this.source.load(res.data);
      // this.totalData = res.count;
    }, error => {
      this.claimsList = [];
      this.totalData = 0;
      console.log(error);
    });
  }

  /**
   * Open Modals for approve and reject status... 
   * @param template 
   */
  public openModal(template: TemplateRef<any>, status) {
    if (status === 'approved') {
      this.isApprove = true;
    } else {
      this.isApprove = false;
    }

    this.approveModal = this.bsModalService.show(template);
  }

  public onApprove(claimedId, status) {
    console.log(claimedId, status);
    let obj: any = {
      claim_status: status
    };
    this.claimedService.claimApproval(claimedId, obj).subscribe((res: any) => {
      res = JSON.parse(res);
      this.approveModal.hide()
      this.toasterService.success(`${res.success[0]}`, 'Success');
      this.getClaimsList();
    }, error => {
      console.log(error);
    });
  }

}
