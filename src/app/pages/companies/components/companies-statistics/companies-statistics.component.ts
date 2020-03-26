import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { debounceTime } from 'rxjs/operators';

interface ICompaniesStatistics {
  user_id: number;
  full_name: string;
  email: string;
  company: string;
  created_at: string;
  tenders_submitted: number;
  moved_to_compete: number;
  move_to_qualify: number;
  added_to_perform: number;
  login_sessions: number;
  emails_sent: number;
  emails_opened: number;
  monitors_count: number;
  searches_executed: number;
  support_requests: number;
  tenders_viewed: number;
  blocks_created: number;
  bid_hub_docs_downloaded: number;
  bid_academy_docs_downloaded: number;
}

@Component({
  selector: 'app-companies-statistics',
  templateUrl: './companies-statistics.component.html',
  styleUrls: ['./companies-statistics.component.scss']
})
export class CompaniesStatisticsComponent implements OnInit {
  public statisticFilterForm: FormGroup;
  public companiesStatistics: ICompaniesStatistics[] = [];
  public page: number = 1;
  public totalData: number = 0;
  public selectedSortItem: any = {};
  public tableHeadNames: Array<any> = [
    { title: 'User Name', key: 'full_name' },
    { title: 'Company Name', key: 'company' },
    { title: 'Origin Date', key: 'created_at' },
    { title: 'Tenders Submitted', key: 'tenders_submitted' },
    { title: 'Moved To Compete', key: 'moved_to_compete' },
    { title: 'Move To Qualify', key: 'move_to_qualify' },
    { title: 'Added To Perform', key: 'added_to_perform' },
    { title: 'Login Sessions', key: 'login_sessions' },
    { title: 'Emails Sent', key: 'emails_sent' },
    { title: 'Emails Opened', key: 'emails_opened' },
    { title: 'Monitors Count', key: 'monitors_count' },
    { title: 'Searches Executed', key: 'searches_executed' },
    { title: 'Support Requests', key: 'support_requests' },
    { title: 'Tenders Viewed', key: 'tenders_viewed' },
    { title: 'Blocks Created', key: 'blocks_created' },
    { title: 'Bid Hub Docs Downloaded', key: 'bid_hub_docs_downloaded' },
    { title: 'Bid Academy Docs Downloaded', key: 'bid_academy_docs_downloaded' }
  ];

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.statisticFilterForm = this.formBuilder.group({
      days: ['all', [Validators.required]],
      search_text: [''],
      company: [''],
      created_at: [''],
      tenders_submitted: [''],
      move_to_qualify: [''],
      added_to_perform: [''],
      login_sessions: [''],
      emails_sent: [''],
      emails_opened: [''],
      monitors_count: [''],
      searches_executed: [''],
      support_requests: [''],
      tenders_viewed: [''],
      blocks_created: [''],
      bid_hub_docs_downloaded: [''],
      bid_academy_docs_downloaded: [''],
      moved_to_compete: [''],
      page: [1]
    });
    this._getCompanyStatistics();

    this.statisticFilterForm.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(data => {
      console.log(data);
      this._getCompanyStatistics()
    });
  }

  private _getCompanyStatistics() {
    this.companyService.getCompanyStatistics(this._setFilterParams()).subscribe((res: any) => {
      res = JSON.parse(res);
      this.totalData = res.count;
      this.companiesStatistics = res.company_statistics;
    }, error => {
      console.error(error);
    })
  }

  /**
 * Set Sort params for get response according to this...
 * @param selectedColum 
 */
  public setSortEventHandler(selectedColum) {
    if (selectedColum.title !== 'User Name') {
      if (this.statisticFilterForm.controls[selectedColum.key].value === '' || this.statisticFilterForm.controls[selectedColum.key].value === 'asc') {
        this.selectedSortItemHandler(selectedColum.key, 'desc');
        this.statisticFilterForm.controls[selectedColum.key].setValue('desc');
      } else if (this.statisticFilterForm.controls[selectedColum.key].value === 'desc') {
        this.selectedSortItemHandler(selectedColum.key, 'asc');
        this.statisticFilterForm.controls[selectedColum.key].setValue('asc');
      }
    }
  }

  /**
  * Handle Sort data...
  * @param sort_by 
  * @param sort_direction 
  */
  public selectedSortItemHandler(sort_by, sort_direction) {
    this.selectedSortItem = {
      sort_by: sort_by,
      sort_direction: sort_direction
    };
  }

  /**
* Pagination handler...
* @param event 
*/
  public pageChanged(event) {
    this.page = event;
    this.statisticFilterForm.controls['page'].setValue(this.page);
    let param = this.statisticFilterForm.controls['days'].value === '30days' ? '30' : '';
    this._getCompanyStatistics();
  }

  /**
 * Get set params for API required Request...  
 */
  private _setFilterParams() {
    return {
      page: this.page,
      days: this.statisticFilterForm.value.days,
      search_text: this.statisticFilterForm.value.search_text,
      sort_by: this.selectedSortItem.hasOwnProperty('sort_by') ? this.selectedSortItem.sort_by : undefined,
      sort_direction: this.selectedSortItem.hasOwnProperty('sort_direction') ? this.selectedSortItem.sort_direction : undefined,
    };
  }

}
