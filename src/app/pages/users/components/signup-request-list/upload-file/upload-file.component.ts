import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  public reqData;
  public blockBtn: boolean = false;
  public fileToUpload: File = null;
  public thisIsCSV: boolean = true;
  public underFileSize: boolean = true;
  public uploadFileLoading: boolean = false;
  public allRowData: any;

  @Input() value;
  @ViewChild('infoModal') public modal: ModalDirective;
  @ViewChild('selectFile') selectFile: ElementRef;

  constructor(
    private toasterService: ToastrService,
    private uploadFileService: UploadFileService
  ) { }

  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (this.rowData && this.rowData.onlyProfile) {
      this.allRowData = this.rowData;
      for (let elem in this.rowData.profile) {
        if (this.rowData.profile[elem] == null || !this.rowData.profile[elem].length || this.rowData.profile[elem] == undefined) {
          delete this.rowData.profile[elem];
        }
      }
      if (!this.rowData.profile) {
        this.blockBtn = true;
      } else {
        this.reqData = Object.keys(this.rowData.profile);
        this.rowData = this.rowData.profile;
      }
    } else {
      this.reqData = Object.keys(this.rowData);
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = File = null
    var a = files.item(0).type;
    if (files.item(0).type === 'text/csv' || files.item(0).type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      if (files[0].size <= 44743292) {
        this.fileToUpload = files.item(0);
        this.thisIsCSV = true;
        this.underFileSize = true;
        const formData: FormData = new FormData();
        formData.append('import[file]', this.fileToUpload);
        formData.append('import[user_id]', this.allRowData.id);
        this.uploadFileService.importCSV_XLS(formData).subscribe((res: any) => {
          res = JSON.parse(res);
          this.toasterService.success(`${res.success}`, 'Success');
          this.modal.hide();
        }, error => {
          console.log(error);
        })
      } else {
        this.underFileSize = false;
      }
    } else {
      this.thisIsCSV = false;
    }
    console.log('this.fileToUpload', this.fileToUpload)
  }

  public uploadFile() {
    this.uploadFileLoading = true;
  }

}
