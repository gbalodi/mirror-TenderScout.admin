import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenderContacts } from 'app/model/tender-contacts';
import { ITenderContact } from 'app/model/tender-contact';
import { ITender } from 'app/model/tender.interface';
import { TenderObj } from '../../../model/tender-obj';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  constructor(
    public httpClient: HttpClient
  ) { }

  private handleTenderContacts(email: string, phone: string, points: ITenderContact[]): TenderContacts {
    const contacts = new TenderContacts(phone ? [phone] : [], email ? [email] : []);
    if (points) {
      points.forEach((point: ITenderContact) => {
        if (point.contact_point) {
          contacts.points.push(point);
        };
        if (!point.contact_point && point.email) {
          contacts.emails.push(point.email);
        };
      })
    }
    return contacts;
  }

  // public id: number = null,
  // public title: string = null,
  // public country: Country = null,
  // public countryName: string = null,
  // public region: string = null,
  // public buyerDocsCount: number = 0,
  // public city: string = null,
  // public description: string = null,
  // public createdAt: Date = null,
  // public organization: string = null,
  // public organizationId: number = 0,
  // public estimatedHighValue: number = null,
  // public estimatedLowValue: number = null,
  // public industry: IIndustry = null,
  // public contacts: TenderContacts = null,
  // public submissionDate: Date = null,
  // public publishedOn: Date = null,
  // public awardedOn: Date = null,
  // public reTenderDate: Date = null,
  // public awards: any = null,
  // public awardValue: string = null,
  // public clarificationsDeadline: Date = null,
  // public answeringDeadline: Date = null,
  // public keywords: string[] = null,
  // public naicsesCodes: ICodesType[] = [],
  // public ngipsCodes: ICodesType[] = [],
  // public nhs_e_classesCodes: ICodesType[] = [],
  // public pro_classesCodes: ICodesType[] = [],
  // public unspscesCodes: ICodesType[] = [],
  // public cpvsCodes: ICodesType[] = [],
  // public gsinsCodes: ICodesType[] = [],
  // public procedure: string = null,
  // public winnerNames?: Array<string>,
  // public classification: string = null,
  // public tenderUrls: string[] = [],

  public handleTender(res: ITender): TenderObj {
    return new TenderObj(
      res.id,
      res.title,
      res.country,
      res.country_name,
      res.region,
      res.buyer_docs_count,
      res.city,
      res.description,
      new Date(res.created_at),
      res.organization_name,
      res.organization_id,
      +res.estimated_high_value,
      +res.estimated_low_value,
      res.industry,
      this.handleTenderContacts(
        res.contact_email,
        res.contact_phone,
        res.contacts
      ),
      res.submission_date ? new Date(res.submission_date) : null,
      res.published_on ? new Date(res.published_on) : null,
      res.awarded_on ? new Date(res.awarded_on) : null,
      res.retender_date ? new Date(res.retender_date) : null,
      res.awards,
      res.award_value,
      res.answering_deadline ? new Date(res.answering_deadline) : null,
      res.keywords,
      res.naicses,
      res.ngips,
      res.nhs_e_classes,
      res.pro_classes,
      res.unspsces,
      res.cpvs,
      res.gsins,
      res.procedure_name,
      res.winner_names,
      res.classification,
      res.tender_urls,
    );
  }

  /**
   * API server call to get a tender details by tender id...
   * @param tenderId 
   */
  public getTenderDetails(tenderId: number | string) {
    return this.httpClient.get(`v1/marketplace/tenders/${tenderId}`).pipe(
      map((tender: any) => {
        tender = JSON.parse(tender)
        return this.handleTender(tender)
      }
      )
    )
  }
}
