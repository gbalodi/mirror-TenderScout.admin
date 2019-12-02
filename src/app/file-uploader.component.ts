import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { FileQueueObject, FileUploaderService, FailedFileQueueObject } from './file-uploader.service';
import { Observable } from 'rxjs';
import { UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'file-uploader, [file-uploader]',
  templateUrl: 'file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})

export class FileUploaderComponent implements OnInit {
  @Input() setUrl: string;
  @Output() onCompleteItem = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  public queue: Observable<FileQueueObject[]>;
  public failedQueue: Observable<FailedFileQueueObject[]>;
  public queueData: Array<any> = [];
  public validationFailedFiles: Array<any> = [];
  public validatedFiles: Array<any> = [];

  constructor(
    public uploader: FileUploaderService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.failedQueue = this.uploader.failedQueue;
    this.uploader.queue.subscribe((res: any) => {
      this.queueData = res;
    });
    this.uploader.onCompleteItem = this.completeItem;
    this.uploader.url = this.setUrl;
  }

  public completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  public addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.selectedFilesFiler(fileBrowser.files);
  }

  public selectedFilesFiler(files) {
    _.each(files, (file: any) => this.uploadValidationHandling(file));
    this.uploader.addToQueue(this.validatedFiles);
    this.uploader.addToFailedQueue(this.validationFailedFiles);
  }

  /**
   * Dropped file event...
   * @param event 
   */
  public dropped(event: UploadEvent) {
    let files: Array<File> = [];
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          files.push(file)

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    setTimeout(() => {
      this.selectedFilesFiler(files);
    }, 2000);

  }

  /**
   * Upload File...
   * @param item 
   */
  public upload(item) {
    item.upload(item);
  }

  /**
   * To Show warning alert according to it's response type... 
   * @param item 
   */
  public uploadValidationHandling(item) {
    let response = this._invalidFile(item)
    if (response === 'size') {
      this.toasterService.warning('File Size should be under 20 MB.', 'Warning');
      item.fileErrorTitle = 'File Size should be under 20 MB.';
      this.validationFailedFiles.push(item);
    } else if (response === 'type') {
      this.toasterService.warning(`File Type Should be xls, xlsx, jpg, jpeg, png, pdf, csv, doc, docx, pptx, ppt.`, 'Warning');
      item.fileErrorTitle = `File Type Should be xls, xlsx, jpg, jpeg, png, pdf, csv, doc, docx, pptx, ppt.`;
      this.validationFailedFiles.push(item);
    } else if (!response) {
      this.validatedFiles.push(item);
    }
  }

  /**
   * Event to check whether the selected file are under 'Type and Size'...
   * @param queueObj 
   */
  public _invalidFile(queueObj) {
    // File Validation check...
    let getExtension = queueObj.name.split('.').pop();
    let fileTypes: String[] = ['xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'];
    if (fileTypes.find(fileType => fileType === getExtension.toLocaleLowerCase()) !== undefined) {
      if (queueObj.size > 20971520) {
        return 'size';
      }
    } else {
      return 'type';
    }
    return false;
  }

  /**
 * Drag and drop...
 * @param event 
 */
  public fileOver(event) {
    console.log(event);
    this.resetArray();
    this.clearQueue();
  }

  /**
 * Drag and Drop...
 * @param event 
 */
  public fileLeave(event) {
    console.log(event);
  }

  /**
   * Just to reset validation files array...
   */
  public resetArray() {
    this.validationFailedFiles = [];
    this.validatedFiles = [];
  }

  /**
   * Clear queue from the file uploader service...
   */
  public clearQueue() {
    this.uploader.clearQueue();
  }

  ngOnDestroy(): void {
    this.clearQueue();
  }
}