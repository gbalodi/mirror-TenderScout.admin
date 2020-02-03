import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-rating-request',
  templateUrl: './rating-request.component.html',
  styleUrls: ['./rating-request.component.scss', '../user-statistics/user-statistics.component.scss']
})
export class RatingRequestComponent implements OnInit {
  public adminRatingRequestsData: Array<any> = [];
  public page: number = 1;
  public totalData: number = 0;
  public ratingFilterForm: FormGroup;
  public tableHeadNames: Array<any> = [
    'User Name', 'File Name', 'User Rating', 'Admin Rating', 'View/Download'
  ];

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService
  ) { }

  ngOnInit() {
    this.ratingFilterForm = this.formBuilder.group({
      search_text: [''],
      page: [1]
    });

    this.getAdminRatingRequests();

    this.ratingFilterForm.valueChanges.pipe(
      debounceTime(700)
    ).subscribe(data => {
      console.log(data);
      this.getAdminRatingRequests();
    });
  }

  public getAdminRatingRequests() {
    this.usersService.getAdminRatingRequests(this.ratingFilterForm.value).subscribe((res: any) => {
      res = JSON.parse(res);
      this.adminRatingRequestsData = res.data;
      this.totalData = res.count;
    }, error => {
      this.adminRatingRequestsData = [];
      this.totalData = 0;
      console.log(error);
    });
  }

  /**
   * To View or Download file...
   * @param fileUrl 
   */
  public viewDownloadHandler(fileUrl) {
    window.open(fileUrl, '_blank');
  }

  /**
   * API service call to set Rating of a user bid document...
   * @param index 
   */
  public setAdminRatingEvent(index) {
    console.log(index);
    setTimeout(() => {
      let obj: any = {
        bid_asset: {
          admin_rating: this.adminRatingRequestsData[index].admin_rating
        }
      };

      this.usersService.setAdminRating(this.adminRatingRequestsData[index].repository.slug, this.adminRatingRequestsData[index].id, obj).subscribe((res: any) => {
        res = JSON.parse(res);
        this.toasterService.success('Rating has set successfully.', 'Success');
      }, error => {
        console.log(error);
      });
    }, 500);
  }

  /**
 * Pagination handler...
 * @param event 
 */
  public pageChanged(event) {
    this.page = event;
    this.ratingFilterForm.controls['page'].setValue(this.page);
  }

}