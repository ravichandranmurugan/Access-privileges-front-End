import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  
} from '@angular/common/http';
import { ModuleMaster } from 'src/app/model/ModuleMaster';
import { from, Observable } from 'rxjs';
import { CustomHttpResponse } from '../../model/custom-http-response';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class ModuleMasterService {
  private host: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getModuleMasters(companyId:string): Observable<ModuleMaster[] | HttpErrorResponse> {
    return this.http.get<ModuleMaster[]>(`${this.host}/module/list/${companyId}`);
  }

  public addModuleMaster(formData: FormData): Observable<ModuleMaster | HttpErrorResponse> {
    debugger
    return this.http.post<ModuleMaster>(`${this.host}/module/add`, formData);
  }

  public updateModuleMaster(formData: FormData): Observable<ModuleMaster | HttpErrorResponse> {
    return this.http.post<ModuleMaster>(`${this.host}/module/update`, formData);
  }

 

  

  public deleteModuleMaster(moduleId: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/module/delete/${moduleId}`);
  }



 

  public createUserFormData(
    currentModuleDescription: string,
    moduleMaster: ModuleMaster
  ): FormData {
    const formData = new FormData();
    formData.append('currentModuleDescription', currentModuleDescription);
    formData.append('moduleId',moduleMaster.moduleId)
    formData.append('moduleDescription', moduleMaster.moduleDescription);
    formData.append('modulePath',moduleMaster.modulePath);
    formData.append('moduleType', moduleMaster.moduleType);
    formData.append('isActive', JSON.stringify(moduleMaster.isActive));
    formData.append('isDeleted',JSON.stringify(moduleMaster.isDeleted))
    formData.append('moduleGroupMaster', JSON.stringify(moduleMaster.moduleGroupMaster));
    formData.append('companyMaster', JSON.stringify(moduleMaster.companyMaster));

    return formData;
  }
}
