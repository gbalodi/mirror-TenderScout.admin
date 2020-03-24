import { Country } from "./country";
import { IIndustry } from "./industry";
import { ICodesType } from "./codes-type";
import { TenderContacts } from "./tender-contacts";

// title: tender.title,
// description: tender.description,
// city: tender.city,
// organization: tender.organization,
// estimatedHighValue: tender.estimatedHighValue,
// estimatedLowValue: tender.estimatedLowValue,
// awardValue: tender.awardValue,
// winnerNames: tender.winnerNames,
// classification: tender.classification,
// tenderUrls: tender.tenderUrls ? tender.tenderUrls[0] : ''

export class TenderObj {
    constructor(
        public id: number = null,
        public title: string = null,
        public country: Country = null,
        public countryName: string = null,
        public region: string = null,
        public buyerDocsCount: number = 0,
        public city: string = null,
        public description: string = null,
        public createdAt: Date = null,
        public organization: string = null,
        public organizationId: number = 0,
        public estimatedHighValue: number = null,
        public estimatedLowValue: number = null,
        public industry: any = null,
        public contacts: TenderContacts = null,
        public submissionDate: Date = null,
        public publishedOn: Date = null,
        public awardedOn: Date = null,
        public reTenderDate: Date = null,
        public awards: any = null,
        public awardValue: string = null,
        public answeringDeadline: Date = null,
        public keywords: string[] = null,
        public naicsesCodes: ICodesType[] = [],
        public ngipsCodes: ICodesType[] = [],
        public nhs_e_classesCodes: ICodesType[] = [],
        public pro_classesCodes: ICodesType[] = [],
        public unspscesCodes: ICodesType[] = [],
        public cpvsCodes: ICodesType[] = [],
        public gsinsCodes: ICodesType[] = [],
        public procedure: string = null,
        public winnerNames?: Array<string>,
        public classification: string = null,
        public tenderUrls: string[] = [],
      ){ }
}
