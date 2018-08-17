import { Component, OnInit } from '@angular/core';
import { MainRequestService } from '../../../../services/main-request.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  constructor(
      private req: MainRequestService,
  ) { }

  ngOnInit() {
    this.req.getData('v1/country').subscribe(res => {
      console.log('res', res);
    })
  }

}
