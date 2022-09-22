export class ModuleGroupMaster {
  public moduleGroupId: string;

  public moduleGroupDescription: string;

  public moduleGroupPath: string;

  public moduleGroupType: string;

  public isDeleted: boolean;

  public isActive: boolean;
  constructor() {
    this.moduleGroupId = '';
    this.moduleGroupDescription = '';
    this.moduleGroupPath = '';
    this.moduleGroupType = '';
    this.isActive = true;
    this.isDeleted = false;
  }
}
