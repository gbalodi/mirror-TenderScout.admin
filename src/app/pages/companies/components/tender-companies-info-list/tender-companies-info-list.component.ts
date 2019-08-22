import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainRequestService } from '../../../../services/main-request.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-tender-companies-info-list',
  templateUrl: './tender-companies-info-list.component.html',
  styleUrls: ['./tender-companies-info-list.component.scss']
})
export class TenderCompaniesInfoListComponent implements OnInit {
  public tenderCompanyForm: FormGroup;
  public countries: any;
  public page: number = 1;
  public tenderCountriesData: Array<any> = [];
  public totalData: number = 0;
  public showWaitingMessage: boolean = false;
  public showNoRecordMessage: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private mainRequestService: MainRequestService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.mainRequestService.getData('v1/dictionaries/countries').subscribe(res => {
      this.countries = JSON.parse(res);
    });
    this.tenderCompanyForm = this.formBuilder.group({
      company_names: [[]],
      country_ids: [[]]
    });

    this.tenderCompanyForm.valueChanges.subscribe(
      value => {
        console.log(value);
        this.getCompaniesContact();
        // this.codeFinderHandler(value.codes);
      }
    );

    this.getCompaniesContact();
  }

  /**
   * API service call to get criteria wise companies with pagination...
   */
  public getCompaniesContact() {
    this.showWaitingMessage = true;
    this.companyService.getCompaniesContact(this.tenderCompanyForm.value, this.page).subscribe((res: any) => {
      res = JSON.parse(res);
      this.tenderCountriesData = res.data;
      this.totalData = res.count;
      this.showWaitingMessage = false;
      this.tenderCountriesData.length === 0 ? this.showNoRecordMessage = true : this.showNoRecordMessage = false;
    }, error => {
      this.tenderCountriesData = []
      this.totalData = 0;
      console.log(error);
      this.showWaitingMessage = false;
      this.tenderCountriesData.length === 0 ? this.showNoRecordMessage = true : this.showNoRecordMessage = false;
    });
  }

  /**
   * Pagination handler...
   * @param event 
   */
  public pageChanged(event) {
    this.page = event;
    this.getCompaniesContact();
  }

  /**
   * API service call to get cvs file of companies...
   */
  public getCSV() {
    this.companyService.exportCSV(this.tenderCompanyForm.value).subscribe((res: any) => {
      res;
    }, error => {
      console.log(error);
    })
  }

}
