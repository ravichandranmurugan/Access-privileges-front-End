import { ModuleMaster } from "./ModuleMaster";

export class CompanyMaster {
  public companyId: String;

  public companyName: String;

  public contactPerson: String;

  public companyEmail: String;

  public companyAddress: String;

  public companyLogo: String;

  public isDeleted: boolean;

  public isActive: boolean;

  public moduleMaster:ModuleMaster[] = []
  constructor() {
    this.companyId = '';

    this.companyName = '';

    this.contactPerson = '';

    this.companyEmail = '';

    this.companyAddress = '';

    this.companyLogo = '';

    this.isDeleted = true;

    this.isActive = true;
  }
}
