import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-injestors-list',
  templateUrl: './injestors-list.component.html',
  styleUrls: ['./injestors-list.component.scss', '../../../scraper/components/scraper-lists/scraper-lists.component.scss']
})
export class InjestorsListComponent implements OnInit {
  public source: ServerDataSource;
  public page: number = 1;
  public settings = {
    mode: 'inline',
    pager: { display: true, perPage: 20 },
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    columns: {
      source_name: {
        title: 'Source',
        editable: false,
        filter: true
      },
      ingested_on: {
        title: 'Ingestion DateTime',
        editable: false,
        filter: true
      },
      status: {
        title: 'Status',
        editable: false,
        filter: true
      },
      total_count: {
        title: '# Records Pulled',
        editable: false,
        filter: false
      },
      import_count: {
        title: '# Updated Records',
        editable: false,
        filter: false
      },
      created_count: {
        title: '# Created Today',
        editable: false,
        filter: false
      },
      last_created_at: {
        title: 'Recent Inserted',
        editable: false,
        filter: false,
        valuePrepareFunction: (value) => {
          if (!value) return '-';
          return value;
        },
      },
      failed_count: {
        title: '# Failed Count',
        editable: false,
        filter: false
      }
    }
  };

  constructor(
    private httpClient: HttpClient,
  ) {
    this.source = new ServerDataSource(httpClient, { endPoint: 'v2/admin/ingestor_details.json?fetch_json=1', pagerPageKey: "page", pagerLimitKey: "page_size", dataKey: 'data', totalKey: 'count', filterFieldKey: '#field#' });    
  }

  ngOnInit() {
    // this.injestorsService.getIngestorDetails(this.page).subscribe((res: any) => {
    //   res = JSON.parse(res);
    //   this.source.setPaging(1, 20, true);
    //   this.source.load(res.data);
    // }, error => {
    //   console.log(error);
    // });
  }

}
