import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  public groups: any;
  private selectedGroup: any;
  public bsModalRef: BsModalRef;
  public groupForm: FormGroup;
  public tableHeadNames: Array<string> = ['Edit', 'Name', 'Action'];

  constructor(
    private bsModalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    this.groupForm = formBuilder.group({
      id: [''],
      name: ['', Validators.required]
    })
  }

  ngOnInit() { }

  public openModal(template: TemplateRef<any>, item: any) {
    if (item) {
      this.selectedGroup = item;
      this.groupForm.patchValue({
        id: item.id,
        name: item.name
      });
    }
    this.bsModalRef = this.bsModalService.show(template, { class: `modal-lg archieve-modal` });
  }

  public submitGroup() {

  }

  public deleteGroupEvent() {

  }

}
