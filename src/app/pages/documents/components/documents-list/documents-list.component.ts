import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  public excludeUsersModalRef: BsModalRef;
  public uploadDocsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService
  ) { }

  ngOnInit() { }

  public uploadDocsOpenModal(template: TemplateRef<any>) {
    this.uploadDocsModalRef = this.bsModalService.show(template, {class: 'upload_modal-holder'});
  }
  public excludeUsersOpenModal(template: TemplateRef<any>) {
    this.excludeUsersModalRef = this.bsModalService.show(template, {class: 'exclude_modal-holder'});
  }


}
