import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

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
  public userStatistics: Array<any> = [];
  public csvData: Array<any> = [];
  public tableHeadNames: Array<any> = [
    { title: 'User Name', key: 'full_name' },
    { title: 'Added To Perform', key: 'added_to_perform' },
    { title: 'Bid Assets Count', key: 'bid_assets_count' },
    { title: 'Emails Opened', key: 'emails_opened' },
    { title: 'Emails Sent', key: 'emails_sent' },
    { title: 'Login Sessions', key: 'login_sessions' },
    { title: 'Monitors Count', key: 'monitors_count' },
    { title: 'Move To Complete', key: 'move_to_complete' },
    { title: 'Move To Qualify', key: 'move_to_qualify' }
  ]

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.statisticFilterForm = this.formBuilder.group({
      days: ['', [Validators.required]],
      search_text: [''],
      added_to_perform: [''],
      bid_assets_count: [''],
      emails_opened: [''],
      emails_sent: [''],
      login_sessions: [''],
      monitors_count: [''],
      move_to_complete: [''],
      move_to_qualify: [''],
      page: [1]
    });

    this.getUserStatistics();

    this.statisticFilterForm.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(data => {
      console.log(data);
      // this.page = 1;
      this.getUserStatistics()
    });
  }

  public getUserStatistics() {
    this.statisticFilterForm.value.page = this.page;
    this.usersService.getUserStatistics(this.statisticFilterForm.value).subscribe((res: any) => {
      res = JSON.parse(res);
      this.totalData = res.count;
      this.userStatistics = res.user_statistics;
    }, error => {
      this.totalData = 0;
      this.userStatistics = [];
      console.log(error);
    });
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
    this.statisticFilterForm.value.page = this.page;
    this.usersService.getExportStatistics(this.statisticFilterForm.value).subscribe((res: any) => {
      res = JSON.parse(res);
      this.csvData = res.user_statistics;
      setTimeout(() => {
        this.csvDownload.nativeElement.click()
      }, 500);
    }, error => {
      console.log(error);
    })
  }

  call(){
    console.log("Bishnu");
  }

}
