import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrbidalGroupService } from '../../services/orbidal-group.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

interface IOrbidalGroup {
  id: number;
  name: string;
  company_count: number;
  companies: Array<any>;
}

interface ICompany {
  id: number;
  name: string;
}

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  public createORBGroupModalRef: BsModalRef;
  public groups: IOrbidalGroup[] = [];
  public ORBGroupForm: FormGroup;
  public editGroup: IOrbidalGroup;
  public companies: ICompany[] = [];
  public selectedCompanies = [];
  public tableHeadNames: Array<{ title: string; key: string; }> = [
    { title: '', key: 'edit' },
    { title: 'Name', key: 'name' },
    { title: 'Company Count', key: 'company_Count' },
    { title: 'Actions', key: 'actions' }
  ];
  public ngbModalOptions: ModalOptions = {
    keyboard: true,
    class: 'modal-lg archieve-modal'
  };
  public dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(
    private orbidalGroupService: OrbidalGroupService,
    private bsModalService: BsModalService,
    private toasterService: ToastrService
  ) { }

  ngOnInit() {
    this.ORBGroupForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
    this._getOrbidalGroups();
    this._getCompaniesList();
  }

  private _getOrbidalGroups() {
    this.orbidalGroupService.getOrbidalGroups().subscribe((res: any) => {
      res = JSON.parse(res);
      this.groups = res;
    }, error => {
      console.error(error);
    });
  }

  private _getCompaniesList() {
    this.orbidalGroupService.getCompaniesList().subscribe((res: any) => {
      res = JSON.parse(res);
      this.companies = res;
    }, error => {
      console.error(error);
    })
  }

  private _getOrbidalGroupDetails(groupId) {
    this.orbidalGroupService.getOrbidalGroupDetails(groupId).subscribe((res: any) => {
      res = JSON.parse(res);
      let companyIds: Array<number> = _.map(res, 'id');
      this.selectedCompanies = _.filter(this.companies, (company) => _.indexOf(companyIds, company.id) > -1);
    }, error => {
      console.error(error);
    })
  }

  /**
   * Open Modal for Create/Edit ORB Group...
   */
  public openAddEditModal(template: TemplateRef<any>, group: IOrbidalGroup) {
    this.editGroup = group ? group : null;
    this.ORBGroupForm.controls['name'].setValue(group ? group.name : null);
    this.createORBGroupModalRef = this.bsModalService.show(template, this.ngbModalOptions);
    if (this.editGroup) {
      this._getOrbidalGroupDetails(this.editGroup.id);
    }
    // console.log(_.filter(this.companies, ['id', 30]));
  }

  public openConfirmDeleteORBGroupModal(template: TemplateRef<any>, group: IOrbidalGroup) {
    this.editGroup = group;
    this.createORBGroupModalRef = this.bsModalService.show(template, this.ngbModalOptions);
    //  ********************** DO NOT DELETE *********************
    // this.bsModalService.onHide.subscribe(result => {
    //   console.log('results', result);
    // });
  }

  public saveOrbidalGroups() {
    let criteria = {
      orbidal_group: this.ORBGroupForm.value
    };

    let method = !this.editGroup ? 'createOrbidalGroups' : 'updateOrbidalGroups'

    this.orbidalGroupService[method](criteria, (!this.editGroup ? undefined : this.editGroup.id)).subscribe((res: any) => {
      res = JSON.parse(res);
      this._getOrbidalGroups();
      this.toasterService.success(`${res.success}`, 'Success');
      this.createORBGroupModalRef.hide();
    }, error => {
      console.error(error);
    });
  }

  public deleteOrbidalGroups() {
    this.orbidalGroupService.deleteOrbidalGroups(this.editGroup.id).subscribe((res: any) => {
      res = JSON.parse(res);
      this._getOrbidalGroups();
      this.toasterService.success(`${res.success}`, 'Success');
      this.createORBGroupModalRef.hide();
    }, error => {
      console.error(error);
    })
  }

  public includeCompaniesORBGroup() {
    let companyIds: Array<number> = _.map(this.selectedCompanies, 'id');

    let criteria = {
      company: {
        company_id: companyIds
      }
    };
    this.orbidalGroupService.includeCompaniesORBGroup(this.editGroup.id, criteria).subscribe((res: any) => {
      res = JSON.parse(res);
    }, error => {
      console.error(error);
    });
  }

  public onItemSelect(item: any) {
    console.log(item);
  }
  public onSelectAll(items: any) {
    console.log(items);
  }

}
