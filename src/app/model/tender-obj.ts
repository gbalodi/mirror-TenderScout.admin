import { Country } from "./country";
import { IIndustry } from "./industry";
import { ICodesType } from "./codes-type";
import { TenderContacts } from "./tender-contacts";

export class TenderObj {
  constructor(
    public id: number = null,
    public description: string = null,
    public title: string = null,
    public organizationName: string = null,
    public organizationId: number = 0,
    public submissionDate: Date = null,
    public publishedOn: Date = null,
    public awardedOn: Date = null,
    public cancelledOn: Date = null,
    public awards: any = null,
    public awardValue: string = null,
    public deadlineDate: string = null,
    public naicsesCodes: ICodesType[] = [],
    public ngipsCodes: ICodesType[] = [],
    public nhs_e_classesCodes: ICodesType[] = [],
    public pro_classesCodes: ICodesType[] = [],
    public unspscesCodes: ICodesType[] = [],
    public cpvsCodes: ICodesType[] = [],
    public gsinsCodes: ICodesType[] = [],
    public answeringDeadline: Date = null,
    public questioningDeadline: Date = null,
    public tenderUrls: string[] = [],
  ) { }
}
