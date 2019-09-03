import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClaimedService } from '../../services/claimed.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actions-modal',
  templateUrl: './actions-modal.component.html',
  styleUrls: ['./actions-modal.component.scss', '../../../users/components/signup-request-list/details/details.component.scss']
})
export class ActionsModalComponent implements OnInit {
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  public isApprove: boolean;
  public approveModal: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private claimedService: ClaimedService,
    private toasterService: ToastrService
  ) { }

  ngOnInit() { }

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
      this.save.emit(this.rowData);
    }, error => {
      console.log(error);
    });
  }

}
