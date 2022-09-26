import { CompanyMaster } from "./CompanyMaster";

export class UserRole {
  public roleId: string;

  public roleDescription: string;

  public companyMaster:CompanyMaster = new CompanyMaster();
  public authorities: string[];
  public deleted!:boolean
  constructor() {
    this.roleId = '';
    this.roleDescription = '';
    this.authorities = [];

  }
}
