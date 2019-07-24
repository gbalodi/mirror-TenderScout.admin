import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { DocumentsListService } from './documents-list.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

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
  public usersList: Array<any> = [];
  public selectedUsers = [];
  public dropdownSettings = {};
  public ngbModalOptions: ModalOptions = {
    // backdrop: 'static',
    keyboard: true,
    class: 'upload_modal-holder'
  };

  constructor(
    private bsModalService: BsModalService,
    private documentsListService: DocumentsListService,
    private toasterService: ToastrService
  ) {
    // // Bootstrap modal On closed/hide/hidden... 
    // this.bsModalService.onHide.subscribe(result => {
    //   console.log('results', result);
    // });
  }

  ngOnInit() {
    this.callGetOrbidalDocumentsListing();

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
    this.callGetExcludedUsersService();
  }

  call(event){
    console.log(event);
  }

  /**
   * API Service call to get all documents list...
   */
  public callGetOrbidalDocumentsListing() {
    this.documentsListService.getOrbidalDocumentsListing().subscribe((res: any) => {
      if (res) {
        res = JSON.parse(res)
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
    this.documentsListService.getUsersInfo().subscribe((res: any) => {
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
    this.documentsListService.getExcludedUsers().subscribe((res: any) => {
      res = JSON.parse(res);
      this.selectedUsers = res.data;
    }, error => {
      console.log(error);
    });
  }

  public uploadDocsOpenModal(template: TemplateRef<any>) {
    this.uploadDocsModalRef = this.bsModalService.show(template, this.ngbModalOptions);
  }
  public excludeUsersOpenModal(template: TemplateRef<any>) {
    this.excludeUsersModalRef = this.bsModalService.show(template, this.ngbModalOptions);
    this.callGetExcludedUsersService();
  }

  public excludeUsersEvent() {
    let userIds: number = _.map(this.selectedUsers, 'id');;
    this.documentsListService.excludeUsers({ orbidal_document: { user_ids: userIds } }).subscribe((res: any) => {
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
    this.callGetOrbidalDocumentsListing();
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onSelectAll(items: any) {
    console.log(items);
  }

}
