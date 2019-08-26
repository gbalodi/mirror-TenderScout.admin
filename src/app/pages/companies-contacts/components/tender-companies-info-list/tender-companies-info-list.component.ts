import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainRequestService } from '../../../../services/main-request.service';
import { CompanyService } from 'app/pages/companies/services/company.service';

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
  res = [];

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
        this.page = 1;
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
      //console.log(JSON.parse(res));
      //res = JSON.parse(res)
      this.res =  JSON.parse(res).data;
      setTimeout(() => {
        document.getElementById("abc").click();
      }, 1500);
      // let data: any = JSON.parse(res).data
      

      // const replacer = (key, value) => value === null ? '' : value;
      // const header = Object.keys(data[0]);
      // let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
      // csv.unshift(header.join(','));
      // let csvArray = csv.join('\r\n');
      // var blob = new Blob([csvArray], {type: 'text/csv' })
      // saveAs(blob, filename + ".csv");
      
    }, error => {
      console.log(error);
    })
  }

    /**
 * To Set Filtered search data into cookies...
 * @param ev 
 */
public setSearch(event) {
  if (this.tenderCompanyForm.controls['company_names'].value.length > 0) {
    let copyByTitle: any = this.tenderCompanyForm.controls['company_names'].value;
    let lastTitle: any = this.tenderCompanyForm.controls['company_names'].value[this.tenderCompanyForm.controls['company_names'].value.length - 1];
    lastTitle = lastTitle.split(',');
    if (lastTitle.length > 1) {
      copyByTitle.pop();
      lastTitle.forEach(element => {
        copyByTitle.push(element);
      });
      this.tenderCompanyForm.controls['company_names'].setValue(copyByTitle);
    } else {
      this.tenderCompanyForm.controls['company_names'].setValue(copyByTitle);
    }
  }
  // this.monitorForm.controls['codesDescription'].value;
  // var codes = [];
  // codes = _.flatMap(this.monitorForm.controls['codesDescription'].value, (value) => { return value.split(': ')[0] });
  // this.monitorForm.controls['codes'].setValue(codes);
  // this.cookieService.set('monitorForm', JSON.stringify(this.monitorForm.value));
  // this.cookieService.set('advansedSearchShow', JSON.stringify({ advansedSearchShow: this.advansedSearchShow }));
}










/**
* Search by Title event handler on blur after typed text... 
* @param event 
*/
public setTitleOnBlurEvent(event) {
  if (event.type === 'blur' && event.target.value.length > 0) {
    console.log('event.target.value', event.target.value);
    if (this.tenderCompanyForm.controls['company_names'].value.length) {
      this.tenderCompanyForm.controls['company_names'].value.push(event.target.value)
    } else {
      this.tenderCompanyForm.controls['company_names'].setValue([]);
      this.tenderCompanyForm.controls['company_names'].value.push(event.target.value)
    }
    setTimeout(() => {
      this.setSearch(undefined);
    }, 100)
    return event.target.value = '';
  }
}

}
