import { CompanyMaster } from './CompanyMaster';
import { ModuleGroupMaster } from './ModuleGroupMaster';

export class ModuleMaster {
  public moduleId: string;

  public moduleDescription: string;

  public modulePath: string;

  public moduleType: string;

  public deleted: boolean;

  public active: boolean;

  

  public moduleGroupMaster: ModuleGroupMaster[] ;
  constructor() {
    this.moduleId = '';
    this.moduleDescription = '';
    this.modulePath = '';
    this.moduleType = '';
    this.active = true;
    this.deleted = false;
    this.moduleGroupMaster = [];
  }
}
