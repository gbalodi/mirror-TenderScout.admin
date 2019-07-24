import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentsListService } from '../../../pages/documents/components/documents-list/documents-list.service';
import { ToastrService } from 'ngx-toastr';

interface IDocument {
  file_name: string
  file_size: string
  file_url: string
  id: number
  img: string
};

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {
  @Input() public document: IDocument;
  @Output() public updateDocumentsList: EventEmitter<any> = new EventEmitter()
  public actions: { [key: string]: string } = {
    download: 'View/Download',
    delete: 'Delete'
  }

  constructor(
    public documentsListService: DocumentsListService,
    private toasterService: ToastrService
  ) { }

  ngOnInit() { }

  public performActionsEvent(actionKey: string): void {
    switch (actionKey) {
      case 'download':
        window.open(this.document.file_url, '_blank');
        break;
      case 'delete':
        this.documentsListService.deleteOrbidalDocumentsById(this.document.id).subscribe((res: any) => {
          res = JSON.parse(res)
          this.toasterService.success(`${res.success}`, 'Success');
          this.updateDocumentsList.emit('update');
        }, error => {
          console.log(error);
        });
        break;
    }
  }

  public stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

}
