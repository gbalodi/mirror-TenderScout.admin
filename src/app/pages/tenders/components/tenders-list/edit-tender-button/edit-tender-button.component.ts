import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-tender-button',
  templateUrl: './edit-tender-button.component.html',
  styleUrls: ['./edit-tender-button.component.scss']
})
export class EditTenderButtonComponent implements OnInit {
  @Input() rowData: any;

  constructor() { }

  ngOnInit() {
  }

}
