import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyMaster } from '../../model/CompanyMaster';
import { CustomHttpResponse } from '../../model/custom-http-response';
import { ModuleMaster } from 'src/app/model/ModuleMaster';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private host: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getCompanys(): Observable<CompanyMaster[] | HttpErrorResponse> {
    return this.http.get<CompanyMaster[]>(`${this.host}/company/list`);
  }

  public addCompany(formData: FormData | CompanyMaster ): Observable<CompanyMaster | HttpErrorResponse> {
    debugger
    return this.http.post<CompanyMaster>(`${this.host}/company/add`, formData);
  }

  public updateCompany(formData: FormData | CompanyMaster,currentCompanyEmail:string): Observable<CompanyMaster | HttpErrorResponse> {
    return this.http.post<CompanyMaster>(`${this.host}/company/update/${currentCompanyEmail}`, formData);
  }

  

  public updateProfileImage(
    formData: FormData
  ): Observable<HttpEvent<CompanyMaster> | HttpErrorResponse> {
    return this.http.post<CompanyMaster>(`${this.host}/company/updateProfileImage`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public deleteCompany(userId: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/company/delete/${userId}`);
  }

 public roleVsModule(roleDescription:string,companyMaster:ModuleMaster): Observable<CompanyMaster | HttpErrorResponse> {
  return this.http.post<CompanyMaster>(`${this.host}/company/roleModule/${roleDescription}`, companyMaster);
}



  public createUserFormData(
    currrentCompanyName: string,
    company: CompanyMaster,
    companyLogo: File
  ): FormData {
    const formData = new FormData();
    // formData.append('companyName', company.companyName);
    // formData.append('companyAddress', company.companyAddress);
    // formData.append('companyEmail', company.companyEmail);
    // formData.append('companyLogo', company.companyLogo);
    // formData.append('contactPerson', company.contactPerson);
    // formData.append('moduleMaster', JSON.stringify(company.moduleMaster));
    // formData.append('isActive', JSON.stringify(company.isActive));
    // formData.append('isDeleted', JSON.stringify(company.isDeleted));

    formData.append("company",JSON.stringify(company));
    formData.append("companyLogo",companyLogo);

    return formData;
  }
}
