import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})
export class UserStatisticsComponent implements OnInit {
  public page: number = 1;
  public totalData: number = 0;
  public statisticFilterForm: FormGroup;
  public userStatistics: Array<any> = [];
  public tableHeadNames: Array<string> = [
    'User Name',
    'Added To Perform',
    'Bid Assets Count',
    'Emails Opened',
    'Emails Sent',
    'Login Sessions',
    'Monitors Count',
    'Move To Complete',
    'Move To Qualify',
    'Sign In Count'
  ]

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.statisticFilterForm = this.formBuilder.group({
      filter: ['', [Validators.required]],
    });

    this.getUserStatistics();

    this.statisticFilterForm.valueChanges.subscribe(
      data => {
        console.log('Username changed:' + data);
        this.page = 1;
        this.getUserStatistics()
      }
    );
  }

  public getUserStatistics() {
    this.usersService.getUserStatistics(this.statisticFilterForm.controls['filter'].value, this.page).subscribe((res: any) => {
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
    let param = this.statisticFilterForm.controls['filter'].value === '30days'? '30': '';
    this.getUserStatistics();
  }

}
