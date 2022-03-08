import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CommonService {
  public properties: any;
  protected baseEndpoint: string="";

  protected cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) { }
  
  public getListWithFilters(jsonData:any): Observable<any[]> {
    return this.http.post<any[]>(this.baseEndpoint+"/select-by-tablename-with-filters", jsonData);
  }
  public getList(jsonData:any): Observable<any[]> {
    return this.http.post<any[]>(this.baseEndpoint+"/select-by-properties", jsonData);
  }
  public getListComboWithFilters(jsonData2:any): Observable<any[]> {
    return this.http.post<any[]>(this.baseEndpoint+"/select-combos-by-properties", jsonData2);
  }
  public getData(jsonData:any): Observable<any> {
    return this.http.post<any>(this.baseEndpoint+"/select-by-id", jsonData);
  }
  public getListComboByTableName(tableName:string,columns:string): Observable<any[]> {
    const params = new HttpParams()
    .set('tableName', tableName)
    .set('descriptionColumns', columns);
    return this.http.get<any[]>(this.baseEndpoint+"/select-combos-by-tablename", {params: params});
  }
  // public listarPaginas(page: string, size: string): Observable<any>{
  //   const params = new HttpParams()
  //   .set('page', page)
  //   .set('size', size);
  //   return this.http.get<any>(`${this.baseEndpoint}/pagina`, {params: params});
  // }

  // public ver(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.baseEndpoint}/${id}`);
  // }

  public create(jsonData: any): Observable<any> {
    return this.http.post<any>(this.baseEndpoint+"/save", jsonData,{ headers: this.cabeceras });
  }

  // public editar(e: any): Observable<any> {
  //   return this.http.put<any>(`${this.baseEndpoint}/${e.id}`, e,
  //     { headers: this.cabeceras });
  // }

  public remove(tableName:string,id: number):Observable<HttpResponse<{}>> {
    let params = new HttpParams().set("tableName",tableName).set("id",id);
    return this.http.delete(this.baseEndpoint+"/delete", { observe: 'response' ,params});
  }
}
