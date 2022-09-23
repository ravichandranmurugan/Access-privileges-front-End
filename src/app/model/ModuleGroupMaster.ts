import { PrivilegedAccess } from './PrivilegedAccess';

export class ModuleGroupMaster {
  public moduleGroupId: string;

  public moduleGroupDescription: string;

  public moduleGroupPath: string;

  public moduleGroupType: string;

  public deleted: boolean;

  public active: boolean;
  public privilegedAccess: PrivilegedAccess[] = [];

  constructor() {
    this.moduleGroupId = '';
    this.moduleGroupDescription = '';
    this.moduleGroupPath = '';
    this.moduleGroupType = '';
    this.active = true;
    this.deleted = false;
  }
}
