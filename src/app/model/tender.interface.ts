import { Country } from "./country";
import { IIndustry } from "./industry";
import { ITenderContact } from "./tender-contact";
import { ICodesType } from "./codes-type";

export interface ITender {
  id: number;
  description: string;
  title: string;
  organization_name: string;
  organization_id: number;
  submission_date?: string;
  published_on?: string;
  awarded_on?: string;
  cancelled_on?: string;
  awards?: any;
  award_value?: string;
  deadline_date?: string;
  naicses?: ICodesType[];
  ngips?: ICodesType[];
  nhs_e_classes?: ICodesType[];
  pro_classes?: ICodesType[];
  unspsces?: ICodesType[];
  cpvs?: ICodesType[];
  gsins?: ICodesType[];
  answering_deadline?: string;
  questioning_deadline?: string;
  tender_urls?: string[];
}
