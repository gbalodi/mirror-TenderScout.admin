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

  public handleTender(res: ITender): TenderObj {
    return new TenderObj(
      res.id,
      res.description,
      res.title,
      res.organization_name,
      res.organization_id,
      res.submission_date ? new Date(res.submission_date) : null,
      res.published_on ? new Date(res.published_on) : null,
      res.awarded_on ? new Date(res.awarded_on) : null,
      res.cancelled_on ? new Date(res.cancelled_on) : null,
      res.awards,
      res.award_value,
      res.deadline_date,
      res.naicses,
      res.ngips,
      res.nhs_e_classes,
      res.pro_classes,
      res.unspsces,
      res.cpvs,
      res.gsins,
      res.answering_deadline ? new Date(res.answering_deadline) : null,
      res.questioning_deadline ? new Date(res.questioning_deadline) : null,
      res.tender_urls,
    );
  }

  /**
   * API server call to get a tender details by tender id...
   * @param tenderId 
   */
  public getTenderDetails(tenderId: number | string) {
    return this.httpClient.get(`v2/admin/tenders/${tenderId}`).pipe(
      map((tender: any) => {
        tender = JSON.parse(tender)
        return this.handleTender(tender)
      }
      )
    )
  }

  /**
   * API server call to update tender...
   * @param tenderId 
   * @param reqParam 
   */
  public updateTender(reqParam, tenderId) {
    return this.httpClient.patch(`v2/admin/tenders/${tenderId}`, reqParam);
  }

  /**
   * API server call to create Tender...
   * @param reqParams 
   */
  public creatTenders(reqParams, noNeed) {
    return this.httpClient.post(`v2/admin/tenders`, reqParams)
  }

  /**
 * Get all Codes string from assert...
 * @param filename 
 */
  public getJSON(filename) {
    return this.httpClient.get("assets/" + filename + ".json");
  }

}
