import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: any = '';
  private loggedInUserName: any = '';
  public host: string = environment.apiUrl;
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {}

  public Login(user: User): Observable<HttpResponse<any>> {
    return this.http.post<User> (
      `${this.host}/user/login`,
      user,
      { observe: 'response' }
    );
  }

  public Register(user: User): Observable<User > {
    return this.http.post<User >(`${this.host}/user/register`, user);
  }


  

  public Logout(): void {
    this.token = null;
    this.loggedInUserName = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('users');
  }

  public saveToken(token: any): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public loadToken(): any {
    this.token = localStorage.getItem('token');
  }

  public getToken(): any {
    return this.token;
  }

  public setloggedInUserName(){
    
   var a=this.getUserFromLocalStorageCache();
this.loggedInUserName = a.userName;
  }
  public addUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalStorageCache(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public isLoggedIn(): any {
    this.loadToken();
    this.setloggedInUserName();
    
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUserName = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.Logout();
      return false;
    }
  }
}  
