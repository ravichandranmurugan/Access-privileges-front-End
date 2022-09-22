export class CompanyMaster {
  public companyId: String;

  public companyName: String;

  public contactPerson: String;

  public companyEmail: String;

  public companyAddress: String;

  public companyLogo: String;

  public isDeleted: boolean;

  private isActive: boolean;

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
