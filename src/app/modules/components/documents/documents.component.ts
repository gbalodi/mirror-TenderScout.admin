import { Component, OnInit, Input } from '@angular/core';

interface IDocument {
  file_name: string
  file_size: string
  file_url: string
  id: number
};

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {
  @Input() public document: IDocument;

  constructor() { }

  ngOnInit() {
  }

}
