import { CompanyMaster } from "./CompanyMaster";

export class UserRole {
  public roleId: string;

  public roleDescription: string;

  public companyMaster!:CompanyMaster;
  public authorities: string[];
  constructor() {
    this.roleId = '';
    this.roleDescription = '';
    this.authorities = [];
  }
}
