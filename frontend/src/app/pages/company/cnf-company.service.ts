import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Company } from './cnf-company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url: string = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  public getAllData(arg1: Company): Observable<any> {
    let params = new HttpParams().set("name", arg1.name)
      .set("taxid", arg1.taxid)
      .set("address", arg1.address)
      ; return this.http.get<Company[]>(`${this.url}/get-all-company`, { params });
  }
  public getAllDataCombo(): Observable<any> {
    return this.http.get<Company[]>(`${this.url}/get-all-company-combo`);
  } 
  public getData(arg1: string): Observable<any> {
    let params = new HttpParams().set("id", arg1)
    return this.http.get<Company>(`${this.url}/get-company`, { params });
  }
  public save(form: any): Observable<Company> {
    return this.http.post<Company>(this.url + '/save-company', form);
  }
  public delete(arg1: string): Observable<HttpResponse<{}>> {
    let params = new HttpParams().set("id", arg1);
    return this.http.delete(this.url + '/delete-company', { observe: 'response', params });
  }
}

