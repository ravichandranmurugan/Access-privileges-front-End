export class UserRole {
  public roleId: string;

  public roleDescription: string;

  public authorities: string[];
  constructor() {
    this.roleId = '';
    this.roleDescription = '';
    this.authorities = [];
  }
}
