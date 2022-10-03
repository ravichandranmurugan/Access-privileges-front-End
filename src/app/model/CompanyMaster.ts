import { ModuleMaster } from "./ModuleMaster";

export class CompanyMaster {
  public companyId: string;

  public companyName: string;

  public contactPerson: string;

  public companyEmail: string;

  public companyAddress: string;

  public companyLogo: string;

  public deleted: boolean;


  public moduleMaster:ModuleMaster[] = []
  constructor() {
    this.companyId = '';

    this.companyName = '';

    this.contactPerson = '';

    this.companyEmail = '';

    this.companyAddress = '';

    this.companyLogo = '';

    this.deleted = true;

    
  }
}
