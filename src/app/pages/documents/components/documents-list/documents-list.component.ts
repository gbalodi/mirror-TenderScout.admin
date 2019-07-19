import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DocumentsListService } from './documents-list.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  public excludeUsersModalRef: BsModalRef;
  public uploadDocsModalRef: BsModalRef;
  public documentsList = [];
  public uploadedFiles: Array<File> = [];
  public fileType: boolean = false;
  public underFileSize: boolean = false;
  public fileTypes: String[] = ['xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'];

  constructor(
    private bsModalService: BsModalService,
    private documentsListService: DocumentsListService
  ) { }

  ngOnInit() {
    this.documentsListService.getTrbidalDocumentsListing().subscribe((res: any) => {
      if (res) {
        res = JSON.parse(res)
        this.documentsList = res;
      } else {
        this.documentsList = [];
      }
    }, error => {
      this.documentsList = [];
      console.log(error);
    })
  }

  public uploadDocsOpenModal(template: TemplateRef<any>) {
    this.uploadDocsModalRef = this.bsModalService.show(template, { class: 'upload_modal-holder' });
  }
  public excludeUsersOpenModal(template: TemplateRef<any>) {
    this.excludeUsersModalRef = this.bsModalService.show(template, { class: 'exclude_modal-holder' });
  }

  public handleFilesInput(files: FileList) {
    console.log(files);
    this.uploadedFiles = [];
    _.forEach(files, (file => {
      // looping code
      let getExtension = file.name.split('.');
      if (this.fileTypes.find(fileType => fileType === getExtension[getExtension.length - 1].toLocaleLowerCase()) !== undefined) {
        if (file.size <= 44743292) {
          this.uploadedFiles.push(file);
          this.fileType = true;
          this.underFileSize = true;
        } else {
          this.underFileSize = false;
        }
      } else {
        this.fileType = false;
      }
    }));

    console.log('this.fileToUpload', this.uploadedFiles)
  }

  public uploadDocuments() {
    const formData: FormData = new FormData();
    _.forEach(this.uploadedFiles, (file => {
      // looping code
      formData.append('uploaded_files[file]', file);
      // formData.append('bid_asset[bid_asset_tags_attributes][][tag_id]', element.id);
    }));
    this.documentsListService.orbidalDocumentsUpload(formData).subscribe((res: any) =>{
      res;
    }, error =>{

    })
  }


}
