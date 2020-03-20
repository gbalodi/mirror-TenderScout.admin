import { ITenderContact } from "./tender-contact";

export class TenderContacts {
  constructor(
    public phones: string[] = [],
    public emails: string[] = [],
    public points: ITenderContact[] = []
  ) { }
}