import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileQueueObject, FileUploaderService } from './file-uploader.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'file-uploader, [file-uploader]',
  templateUrl: 'file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})

export class FileUploaderComponent implements OnInit {

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;

  constructor(public uploader: FileUploaderService) { }

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement;
    this.uploader.addToQueue(fileBrowser.files);
  }
}