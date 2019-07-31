import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

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
      source: {
        title: 'Source',
        editable: false
      },
      url: {
        title: 'URL',
        editable: false
      },
      date_time: {
        title: 'Date/time (of ingestion)',
        editable: false
      },
      records_pulled: {
        title: '# Records pulled',
        editable: false
      },
      date_of_most_recent_record_pulled: {
        title: 'Date of most recent record pulled',
        editable: false
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

  public onEditConfirm(event): void {
    console.log(event);
    if (event.data.role !== event.newData.role) { }
  }

}
