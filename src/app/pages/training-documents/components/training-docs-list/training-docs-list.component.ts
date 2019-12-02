import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap';
import { TrainingDocsListService } from './training-docs-list.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../companies/services/company.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-training-docs-list',
  templateUrl: './training-docs-list.component.html',
  styleUrls: ['./training-docs-list.component.scss', '../../../documents/components/documents-list/documents-list.component.scss']
})
export class TrainingDocsListComponent implements OnInit {
  public excludeUsersModalRef: BsModalRef;
  public uploadDocsModalRef: BsModalRef;
  public documentsList = [];
  public uploadedFiles: Array<File> = [];
  public fileType: boolean = false;
  public underFileSize: boolean = false;
  public fileTypes: String[] = ['xls', 'xlsx', 'jpg', 'jpeg', 'png', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt'];
  public usersList: Array<any> = [];
  public selectedUsers = [];
  public initialSelectedUsers = [];
  public dropdownSettings = {};
  public setUrl: string = 'v2/admin/training_documents';
  public ngbModalOptions: ModalOptions = {
    keyboard: true,
    class: 'upload_modal-holder'
  };
  constructor(
    private bsModalService: BsModalService,
    private trainingDocsListService: TrainingDocsListService,
    private toasterService: ToastrService,
    private companyService: CompanyService
  ) {
    // // Bootstrap modal On closed/hide/hidden... 
    this.bsModalService.onHide.subscribe(result => {
      this.selectedUsers = [...this.initialSelectedUsers];
    });
  }

  ngOnInit() {
    this.callGetTrainingDocumentsListing();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.callGetUsersInfoService();
    // this.callGetExcludedUsersService();
  }

  call(event) {
    console.log(event);
  }

  /**
   * API Service call to get all documents list...
   */
  public callGetTrainingDocumentsListing() {
    this.trainingDocsListService.getTrainingDocumentsListing().subscribe((res: any) => {
      if (res) {
        this.documentsList = res;
      } else {
        this.documentsList = [];
      }
    }, error => {
      this.documentsList = [];
      console.log(error);
    });
  }

  /**
   * Service call to get users Info list...
   */
  public callGetUsersInfoService() {
    this.companyService.getUsersInfo().subscribe((res: any) => {
      res = JSON.parse(res);
      this.usersList = res.data;
    }, error => {
      this.usersList = [];
      console.log(error);
    });
  }

  /**
   * Service call to get Excluded users list...
   */
  public callGetExcludedUsersService() {
    this.trainingDocsListService.getExcludedUsers().subscribe((res: any) => {
      this.selectedUsers = JSON.parse(res).data;
      this.initialSelectedUsers = [...this.selectedUsers];
    }, error => {
      console.log(error);
    });
  }

  /**
   * To Show Upload Documents Modal...
   * @param template 
   */
  public uploadDocsOpenModal(template: TemplateRef<any>) {
    this.uploadDocsModalRef = this.bsModalService.show(template, this.ngbModalOptions);
  }

  /**
   * To Show Exclude Users Modal...
   * @param template 
   */
  public excludeUsersOpenModal(template: TemplateRef<any>) {
    this.excludeUsersModalRef = this.bsModalService.show(template, this.ngbModalOptions);
  }

  /**
   * API service call to Exclude users...
   */
  public excludeUsersEvent() {
    let userIds: number = _.map(this.selectedUsers, 'id');;
    this.trainingDocsListService.excludeUsers({ orbidal_document: { user_ids: userIds } }).subscribe((res: any) => {
      res = JSON.parse(res);
      this.toasterService.success(`${res.success}`, 'Success');
      this.excludeUsersModalRef.hide();
      this.callGetExcludedUsersService();
    }, error => {
      console.log(error);
    })
  }

  /**
   * On Complete uploaded Item...
   * @param $event 
   */
  public onCompleteItem($event) {
    console.log($event);
    this.callGetTrainingDocumentsListing();
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onSelectAll(items: any) {
    console.log(items);
  }

}
