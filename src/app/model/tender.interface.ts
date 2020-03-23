import { Country } from "./country";
import { IIndustry } from "./industry";
import { ITenderContact } from "./tender-contact";
import { ICodesType } from "./codes-type";

export interface ITender {
    id: number;
  country: Country;
  country_name: string;
  average_score: number;
  description: string;
  created_at: string;
  title: string;
  organization_name: string;
  organization_id: number;
  bnb?: boolean;
  bnb_last_answer_date?: string;
  bid_status_last_answer_date?: string;
  bid_hub_slug?: string;
  estimated_high_value?: number;
  estimated_low_value?: number;
  complete_status?: number;
  keywords?: string[];
  submission_date?: string;
  published_on?: string;
  awarded_on?: string;
  retender_date?: string;
  awards?: any;
  award_value?: string;
  region?: string;
  buyer_docs_count?: number;
  dispatch_date?: string;
  deadline_date?: string;
  industry?: IIndustry;
  contact_email?: string;
  contact_phone?: string;
  contacts?: ITenderContact[],
  naicses?: ICodesType[];
  ngips?: ICodesType[];
  nhs_e_classes?: ICodesType[];
  pro_classes?: ICodesType[];
  unspsces?: ICodesType[];
  cpvs?: ICodesType[];
  gsins?: ICodesType[];
  procedure_name?: string;
  compete?: boolean;
  proposal_id?: number;
  proposal_status?: string;
  winner_names?: Array<string>;
  classification?: string;
  status?: string;
  city?: string;
  questioning_deadline?: string;
  answering_deadline?: string;
  is_scrapped?: boolean;
  tender_urls?: string[];
  favourite?: boolean;
  user_status?: string;
  repo_exists?: boolean;
  bid_assets_count?: number;
}