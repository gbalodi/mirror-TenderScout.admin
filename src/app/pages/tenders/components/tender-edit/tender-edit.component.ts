import { Component, OnInit } from '@angular/core';
import { MainRequestService } from 'app/services/main-request.service';
import { ActivatedRoute } from '@angular/router';
import { TenderService } from '../../services/tender.service';
import { ITender } from '../../../../model/tender.interface';
import { TenderObj } from '../../../../model/tender-obj';
import { FormGroup, FormBuilder } from '@angular/forms';
// title: tender.title,
// description: tender.description,
// averageScore: tender.averageScore,
// city: tender.city,
// createdAt: tender.createdAt,
// organization: tender.organization,
// estimatedHighValue
// estimatedLowValue
// industry
// contacts
// submissionDate
// publishedOn
// awardedOn
// reTenderDate
// awards
// awardValue
// answeringDeadline
// naicsesCodes
// ngipsCodes
// nhs_e_classesCodes
// pro_classesCodes
// unspscesCodes
// cpvsCodes
// gsinsCodes
// winnerNames
// classification
// tenderUrls

class abc {
  constructor(tender) {
    return {
      title: tender.title,
      description: tender.description,
      city: tender.city,
      organization: tender.organization,
      estimatedHighValue: tender.estimatedHighValue,
      estimatedLowValue: tender.estimatedLowValue,
      awardValue: tender.awardValue,
      winnerNames: tender.winnerNames,
      classification: tender.classification,
      tenderUrls: tender.tenderUrls ? tender.tenderUrls[0] : ''
    }
  }
};

@Component({
  selector: 'app-tender-edit',
  templateUrl: './tender-edit.component.html',
  styleUrls: ['./tender-edit.component.scss']
})
export class TenderEditComponent implements OnInit {
  public tenderForm: FormGroup;
  public object = Object;
  public tender: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tenderService: TenderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.tenderForm = this.formBuilder.group({
      title: [''],
      description: [''],
      city: [''],
      organization: [''],
      estimated_high_value: [''],
      estimated_low_value: [''],
      award_value: [''],
      winner_names: [''],
      classification: [''],
      tender_urls: ['']
    });
    this.activatedRoute.params.subscribe(param => {
      console.log(param);
      if (param.id) {
        this.tenderService.getTenderDetails(param.id).subscribe((res: TenderObj) => {
          console.log(res);
          let tender = new abc(res);
          this.tender = tender;

          this.tenderForm.patchValue({
            title: this.tender.title,
            description: this.tender.description,
            city: this.tender.city,
            organization: this.tender.organization,
            estimated_high_value: this.tender.estimatedHighValue,
            estimated_low_value: this.tender.estimatedLowValue,
            award_value: this.tender.awardValue,
            winner_names: this.tender.winnerNames,
            classification: this.tender.classification,
            tender_urls: this.tender.tenderUrls
          })

        }, error => {
          console.error(error);
        });

      }
    });

  }

  public replaceUnderscore(string) {
    return string.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, (key) => { return key.toUpperCase() })
  }

  public typeChecking(key) {
    switch (key) {
      case "description":
        return 'textarea';
      default:
        return 'text'
        // alert('Default case');
    }
  }

}
