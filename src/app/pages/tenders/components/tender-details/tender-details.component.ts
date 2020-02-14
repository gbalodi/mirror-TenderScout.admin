import { Component, OnInit } from '@angular/core';
import { TenderService } from '../../services/tender.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit {
  public tenderId: number;
  public tenderDetails: any;

  constructor(
    public tenderService: TenderService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      if (params['id']) {
        this.tenderId = +params['id'];
        this.getTenderDetails();
      };
    });
  }

  ngOnInit() { }

  public getTenderDetails() {
    this.tenderService.getTenderDetails(this.tenderId).subscribe((res: any) => {
      res = JSON.parse(res);
      console.log(res);
      this.tenderDetails = res;
    }, error => {
      console.error(error);
    })

  }

}
