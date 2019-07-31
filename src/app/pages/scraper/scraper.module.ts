import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScraperRoutingModule } from './scraper-routing.module';
import { ScraperListsComponent } from './components/scraper-lists/scraper-lists.component';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ScraperRoutingModule,
    SharedModule
  ],
  declarations: [
    ScraperListsComponent
  ]
})
export class ScraperModule { }
