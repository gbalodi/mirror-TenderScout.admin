import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

// class UserStat {
//   constructor(
//     public userId: number = null,
//     public fullName: string = null,
//     public email: string = null,
//     public createdAt: string = null,
//     public moveToComplete: number = null,
//     public moveToQualify: number = null,
//     public addedToPerform: number = null,
//     public loginSessions: number = null,
//     public emailsSent: number = null,
//     public emailsOpened: number = null,
//     public monitorsCount: number = null,
//     public bidAssetsCount: number = null,
//   ) { }
// }

interface IUserStatistics {
  user_id?: number;
  full_name: string;
  email: string;
  created_at: string;
  last_login_date: string;
  tenders_submitted: number;
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
  documents_downloaded: number;
  moved_to_compete: number;
}

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})
export class UserStatisticsComponent implements OnInit {
  @ViewChild('abc') csvDownload: ElementRef;
  public page: number = 1;
  public totalData: number = 0;
  public statisticFilterForm: FormGroup;
  public userStatistics: IUserStatistics[] = [];
  public csvData: Array<any> = [];
  public selectedSortItem: any;
  public tableHeadNames: Array<any> = [
    { title: 'User Name', key: 'full_name' },
    { title: 'Origin Date', key: 'created_at' },
    { title: 'Last Login Date', key: 'last_login_date' },
    { title: 'Added To Perform', key: 'added_to_perform' },
    { title: 'Blocks Created', key: 'blocks_created' },
    { title: 'Emails Sent', key: 'emails_sent' },
    { title: 'Login Sessions', key: 'login_sessions' },
    { title: 'Monitors Count', key: 'monitors_count' },
    { title: 'Tenders Submitted', key: 'tenders_submitted' },
    { title: 'Move To Qualify', key: 'move_to_qualify' },
    { title: 'Moved To Compete', key: 'moved_to_compete' },
    { title: 'Support Requests', key: 'support_requests' },
    { title: 'Tenders Viewed', key: 'tenders_viewed' },
    { title: 'Bid Hub Docs Downloaded', key: 'bid_hub_docs_downloaded' },
    { title: 'Bid Academy Docs Downloaded', key: 'bid_academy_docs_downloaded' },

  ];

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.statisticFilterForm = this.formBuilder.group({
      days: ['all', [Validators.required]],
      search_text: [''],
      created_at: [''],
      last_login_date: [''],
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
    this.selectedSortItem = {};

    this.getUserStatistics();

    this.statisticFilterForm.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(data => {
      console.log(data);
      this.getUserStatistics()
    });
  }

  /**
   * API service call to get User statistic according to filter...
   */
  public getUserStatistics() {
    this.statisticFilterForm.value.page = this.page;
    this.usersService.getUserStatistics(this.setFilterParams()).subscribe((res: any) => {
      res = JSON.parse(res);
      // res.user_statistics = res.user_statistics.map((user) => new UserStat(user));
      this.totalData = res.count;
      this.userStatistics = res.user_statistics;
    }, error => {
      this.totalData = 0;
      this.userStatistics = [];
      console.log(error);
    });
  }

  /**
   * Get set params for API required Request...  
   */
  private setFilterParams() {
    return {
      page: this.page,
      days: this.statisticFilterForm.value.days,
      search_text: this.statisticFilterForm.value.search_text,
      sort_by: this.selectedSortItem.hasOwnProperty('sort_by') ? this.selectedSortItem.sort_by : undefined,
      sort_direction: this.selectedSortItem.hasOwnProperty('sort_direction') ? this.selectedSortItem.sort_direction : undefined,
    };
  }

  /**
  * Pagination handler...
  * @param event 
  */
  public pageChanged(event) {
    this.page = event;
    let param = this.statisticFilterForm.controls['days'].value === '30days' ? '30' : '';
    this.getUserStatistics();
  }

  /**
   * API service call to get criteria wise export CSV file of user statistics...
   */
  public getCSV() {
    this.usersService.getExportStatistics(this.setFilterParams()).subscribe((res: any) => {
      res = JSON.parse(res);
      this.csvData = res.user_statistics;
      setTimeout(() => {
        this.csvDownload.nativeElement.click()
      }, 500);
    }, error => {
      console.log(error);
    });
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

}
