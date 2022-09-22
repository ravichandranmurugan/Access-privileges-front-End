import { CompanyMaster } from './CompanyMaster';
import { ModuleGroupMaster } from './ModuleGroupMaster';

export class ModuleMaster {
  public moduleId: string;

  public moduleDescription: string;

  public modulePath: string;

  public moduleType: string;

  public isDeleted: boolean;

  public isActive: boolean;

  public companyMaster!: CompanyMaster;

  public moduleGroupMaster: ModuleGroupMaster[] ;
  constructor() {
    this.moduleId = '';
    this.moduleDescription = '';
    this.modulePath = '';
    this.moduleType = '';
    this.isActive = true;
    this.isDeleted = false;
    this.moduleGroupMaster = [];
  }
}
