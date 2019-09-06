import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./modules/authorization/services/auth-guard.service";

// Import Containers
import { FullLayoutComponent } from "./containers";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: FullLayoutComponent,
    data: {
      title: "Home"
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: "./views/dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "dictionaries",
        loadChildren:
          "./pages/dictionaries/dictionaries.module#DictionariesModule"
      },
      {
        path: "users",
        loadChildren: "./pages/users/users.module#UsersModule"
      },
      {
        path: "companies",
        loadChildren: "./pages/companies/companies.module#CompaniesModule"
      },
      {
        path: "companies-contacts",
        loadChildren: "./pages/companies-contacts/companies-contacts.module#CompaniesContactsModule"
      },
      {
        path: "tenders",
        loadChildren: "./pages/tenders/tenders.module#TendersModule"
      },
      {
        path: "orbidal-documents",
        loadChildren: "./pages/documents/documents.module#DocumentsModule"
      },
      {
        path: "scraper",
        loadChildren: "./pages/scraper/scraper.module#ScraperModule"
      },
      {
        path: "ingestors",
        loadChildren: "./pages/injestors/injestors.module#InjestorsModule"
      },
      {
        path: "claims",
        loadChildren: "./pages/claimed-companies/claimed-companies.module#ClaimedCompaniesModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
