import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FileQueueObject, FileUploaderService } from './file-uploader.service';
import { Observable } from 'rxjs';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'file-uploader, [file-uploader]',
  templateUrl: 'file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})

export class FileUploaderComponent implements OnInit {
  @Output() onCompleteItem = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  public queue: Observable<FileQueueObject[]>;
  public queueData: Array<any> = [];

  constructor(
    public uploader: FileUploaderService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.queue.subscribe((res: any) => {
      this.queueData = res;
    });
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
    // this.uploader.numberOfUploadedFiles = fileBrowser.files.length;
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
      this.uploader.addToQueue(files);
      // this.uploader.numberOfUploadedFiles = files.length;
    }, 2000);

  }

  public upload(item) {
    // this.queueData[item]
    let response = item.invalidFile(item)
    if (response === 'size') {
      this.toasterService.warning('Size should be under 20 MB.', 'Warning');
    } else if (response === 'type') {
      this.toasterService.warning(`Type Should be 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'.`, 'Warning');
    } else if (response === false) {
      item.upload(item);
    }
  }

  /**
 * Drag and drop...
 * @param event 
 */
  public fileOver(event) {
    console.log(event);
  }

  /**
 * Drag and Drop...
 * @param event 
 */
  public fileLeave(event) {
    console.log(event);
  }
}