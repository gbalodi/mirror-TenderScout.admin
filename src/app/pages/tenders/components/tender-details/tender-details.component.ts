import { Component, OnInit } from '@angular/core';
import { TenderService } from '../../services/tender.service';
import { ActivatedRoute } from '@angular/router';
import { Tender } from '../../../../app/model/tender';

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
      this.tenderDetails = this.handleRes(res);
    }, error => {
      console.error(error);
    })
  }

  public handleRes(res: any) {
    return new Tender(
      res.title,
      res.description,
      res.published_on,
      res.awarded_on,
      res.submission_date,
      res.deadline_date,
      res.cancelled_on,
      res.currency_name,
      res.organization_name,
      res.status,
      res.country,
      res.estimated_low_value,
      res.estimated_high_value,
      res.estimated_value,
      res.average_score,
      res.collaboration,
      res.user_status,
      res.favourite,
      res.keywords,
      res.created_at,
      res.updated_at,
      res.award_published_on,
      res.potential_retender_date,
      res.tender_urls,
      res.award_urls,
      res.contact_email,
      res.contact_phone,
      res.gsins,
      res.unspsces,
      res.cpvs,
      res.naicses,
      res.ngips
    );
  }

  public navigate(url) {
    window.open(url, "_blank");
  }

  public keyChecking(key) {
    return key !== 'country' && key !== 'tender_urls' && key !== 'published_on' && key !== 'submission_date' && key !== 'created_at' && key !== 'updated_at' && key !== 'cpvs'
      && key !== 'naicses' && key !== 'ngips' && key !== 'unspsces' && key !== 'gsins';
  }

  public dateChecking(key) {
    return key === 'published_on' || key === 'submission_date' || key === 'created_at' || key === 'updated_at';
  }

  public codesHandler(codes) {
    console.log(codes);
    let codeStr: Array<string> = [];
    codes.map(code => {
      codeStr.push(`<b>` + code.code + `</b>` + ': ' + `<i>` + code.description + `</i>`)
    });
    return codeStr.join(', ');
  }

  public typeOfChecking(key) {
    if ((key === 'cpvs' || key === 'naicses' || key === 'ngips' || key === 'unspsces' || key === 'gsins') && this.tenderDetails[key].length > 0) {
      return true
    } else if ((key === 'cpvs' || key === 'naicses' || key === 'ngips' || key === 'unspsces' || key === 'gsins')) {
      return false;
    }
    return true;
  }

}
