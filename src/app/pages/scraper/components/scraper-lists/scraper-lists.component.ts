import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ScraperListsService } from './scraper-lists.service';

@Component({
  selector: 'app-scraper-lists',
  templateUrl: './scraper-lists.component.html',
  styleUrls: ['./scraper-lists.component.scss', '../../../users/components/users-list/users-list.component.scss']
})

export class ScraperListsComponent implements OnInit {
  public source: LocalDataSource = new LocalDataSource();
  public settings = {
    mode: 'inline',
    pager: { display: true, perPage: 20 },
    edit: {
      confirmSave: true,
    },
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    columns: {
      source_name: {
        title: 'Source',
        editable: false,
        filter: false
      },
      url: {
        title: 'URL',
        editable: false,
        filter: false
      },
      ingested_on: {
        title: 'Ingestion DateTime',
        editable: false,
        filter: false
      },
      total_scraped_count: {
        title: '# Records pulled',
        editable: false,
        filter: false
      },
      created_count: {
        title: '# Created Today',
        editable: false,
        filter: false
      },
      last_scraped_record: {
        title: 'Recent pulled record',
        editable: false,
        filter: false
      },
      status: {
        title: 'Status',
        editable: false,
        filter: false
      }
    }
  };

  constructor(
    private scraperListsService: ScraperListsService
  ) { }

  ngOnInit() {
    this.getScrappers();
  }

  public onEditConfirm(event): void {
    console.log(event);
  }

  /**
   * API service call to get Scrappers...
   */
  public getScrappers() {
    this.scraperListsService.getScrappers().subscribe((res: any) => {
      res = JSON.parse(res);
      this.source.setPaging(1, res.length, true);
      this.source.load(res);
    }, error => {
      console.log(error);
    });
  }

}
