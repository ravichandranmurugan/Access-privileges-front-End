import { CompanyMaster } from './CompanyMaster';

export class PrivilegedAccess {
  public privilegedAccessId: string;

  public companyMaster!: CompanyMaster;

  public adds: boolean;

  public edits: boolean;

  public deletes: boolean;

  public views: boolean;

  public prints: boolean;

  public createdBy: string;

  public updateBy: string;

  public createdUTC!: Date;

  public updatedUTC!: Date;
  constructor() {
    this.privilegedAccessId = '';
    this.adds = false;
    this.deletes = false;
    this.edits = false;
    this.prints = false;
    this.views = false;
    this.createdBy = '';
    this.updateBy = '';
  }
}
