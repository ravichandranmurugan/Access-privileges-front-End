import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRole } from '../../model/UserRole';
import { CustomHttpResponse } from '../../model/custom-http-response';
import { PrivilegedAccess } from 'src/app/model/PrivilegedAccess';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
 
  private host: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getUsersRole(): Observable<UserRole[] | HttpErrorResponse> {
    debugger
    return this.http.get<UserRole[]>(`${this.host}/userRole/list`);
  }

  public addUserRole(formData: FormData): Observable<UserRole | HttpErrorResponse> {
    return this.http.post<UserRole>(`${this.host}/userRole/add`, formData);
  }

  public updateUserRole(formData: FormData): Observable<UserRole | HttpErrorResponse> {
    return this.http.post<UserRole>(`${this.host}/userRole/update`, formData);
  }




  public deleteUserRole(userRoleId: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/userRole/delete/${userRoleId}`);
  }

public addNewRoleWithPrivilegesAccess(userRole:UserRole):Observable<UserRole | HttpErrorResponse>{
  debugger
  return this.http.post<UserRole>(`${this.host}/userRole/addNewRole`,userRole);
}
public updateRoleWithPrivilegesAccess(privilegedAccess:PrivilegedAccess[],roleDescription:string,status:boolean,oleDescription:string):Observable<PrivilegedAccess[] | HttpErrorResponse>{
  debugger
  return this.http.post<PrivilegedAccess[]>(`${this.host}/userRole/updateRole/${roleDescription}/${status}/${oleDescription}`,privilegedAccess);
}
  public createUserFormData(
    oldroleDescription: string,
    userRole: UserRole
  ): FormData {
    const formData = new FormData();
    formData.append('oldRoleDescription', oldroleDescription);
    formData.append('roleDescription', userRole.roleDescription);
    formData.append('authorities',JSON.stringify( userRole.authorities));
    return formData;
  }
}
