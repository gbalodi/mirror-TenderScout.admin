import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScraperListsComponent } from './components/scraper-lists/scraper-lists.component';

const routes: Routes = [
  {
    path: 'list',
    component: ScraperListsComponent,
    data: {
      title: 'Scraper Status'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScraperRoutingModule { }
