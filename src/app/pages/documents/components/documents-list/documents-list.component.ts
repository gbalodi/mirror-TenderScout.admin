import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  public bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService
  ) { }

  ngOnInit() { }

  public openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template);
  }


}
