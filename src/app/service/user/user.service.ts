import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import { CustomHttpResponse } from '../../model/custom-http-response';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private host: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    debugger
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse   | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetPassword/${email}`);
  }

  public updateProfileImage(
    formData: FormData
  ): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public deleteUser(userId: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersToLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users') || '{}');
    }
    return [];
  }

  public createUserFormData(
    loggedInUserName: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.append('currentUserName', loggedInUserName);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('userName', user.userName);
    formData.append('email', user.email);
   // formData.append('userRole',JSON.stringify(user.userRole));
    formData.append('userRoleId',user.userRoleId)
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNotLocked', JSON.stringify(user.notLocked));

    return formData;
  }
}
