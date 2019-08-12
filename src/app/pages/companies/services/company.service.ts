import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable, from } from "rxjs";
import { map, tap } from "rxjs/operators";

class Country {
  constructor(public name: string) { }
  public id: number;
  public code: number;
  public number: number;
  public alpha2code: string;
  public alpha3code: string;
  public _world_region: string;
  public world_subregion: string;
  public currency: {
    name: string;
    code: string;
    unit: string;
  };
  public world_region: {
    code: string;
    name: string;
  }
}

class Industry {
  public id: number;
  public name: string;
}

@Injectable({
  providedIn: "root"
})
export class CompanyService {
  public countriesKeyValue: { [key: string]: string };
  public industriesKeyValue: { [key: string]: string };
  public industries: any;

  constructor(private httpClient: HttpClient) {}

  /**
   * API server service call to get all Keywords of the company profile...
   */
  public getKeywords() {
    return this.httpClient.get(
      `v2/users/companies/keywords`
    );
  }

  /**
   * API server service call to get users info...
   */
  public getUsersInfo() {
    return this.httpClient.get(`v1/users/users_info`);
  }

  /**
   * API server service call to create new company profile...
   * @param data
   */
  public createCompany(data) {
    return this.httpClient.post(
      `v2/users/companies`,
      data
    );
  }

  /**
   * API server service call to upload company logo...
   * @param data
   */
  public uploadCompanyLogo(data) {
    return this.httpClient.post(
      `v2/users/companies/create_logo`,
      data
    );
  }

  /**
   * API server service call to delete company logo...
   * @param data
   */
  public deleteCompanyLogo() {
    return this.httpClient.delete(
      `v2/users/companies/destroy_logo`
    );
  }

  public getCompaniesInfo() {
    return this.httpClient.get(`v2/users/companies`);
  }

  public updateCompanyProfile(data) {
    return this.httpClient.put(
      `v2/users/companies/${data.company.id}`,
      data
    );
  }

  public getCountryListAsKeyValue(): Observable<{ [key: string]: string }> {
    if (this.countriesKeyValue) {
      return from([this.countriesKeyValue]);
    } else {
      return this.httpClient.get( 'v1/dictionaries/countries')
      .pipe(
        map(
          (countries: any) => {
            countries = JSON.parse(countries);
            const countryMap: { [key: string]: string } = {};
            countries.forEach((country: Country) => countryMap[country.id] = country.name);
            return countryMap;
          }
        )
      ).pipe(
        tap((coutryMap: {[key: string]: string}) => this.countriesKeyValue = coutryMap)
      );
    }
  }

  public getIndustries(): Observable<any> {
    if (this.industries) {
      return from([this.industries]);
    } else {
      return this.httpClient.get( 'v1/dictionaries/industries')
        .pipe(
          tap((industries: Industry[]) => this.industries = industries)
        )
    }
  }

  public getIndustriesAsKeyValue(): Observable<any> {
    if (this.industriesKeyValue) {
      return from([this.industriesKeyValue]);
    } else {
      this.industriesKeyValue = {};
      return this.getIndustries().pipe(
        map((industries) => {
          industries = JSON.parse(industries)
          const industryMap: { [key: string]: string } = {};
          industries.forEach((industry: Industry) => industryMap[industry.id] = industry.name);
          return industryMap;
        })
      )
      .pipe(
        tap((industryMap: {[key: string]: string}) => this.industriesKeyValue = industryMap)
        )
    }
  }

  public getMarketplaceUsers(): Observable<any> {
    return this.httpClient.get(`v1/users/available_in_marketplace?page=1&page_size=20`);
  }
}
