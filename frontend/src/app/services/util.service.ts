import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Status } from '../base/interfaces/State';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  datablesSettings!:DataTables.Settings;
  datablesSettingsChild!:DataTables.Settings;
  // public listReports:any[] = [];
  url:string  = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router,private translate:TranslateService) { 
    let lang = localStorage.getItem('lang');
    console.log(lang);
    // if (rememberUser != "null") {
    //   this.profile = rememberUser ? <SecRole>JSON.parse(rememberUser).profile : new SecRole();
    //   // this.tenant = rememberUser ? <CnfTenant>JSON.parse(rememberUser).tenant : new CnfTenant();
    //   // this.company = rememberUser ? <CnfCompany>JSON.parse(rememberUser).company : new CnfCompany();
    //   // this.org = rememberUser ? <CnfOrg>JSON.parse(rememberUser).org : new CnfOrg();
    //   console.log(this.profile);
    // }
    this.datablesSettings={
        deferRender : true,
        deferLoading:7,
        pagingType: 'full_numbers',
        searching: false,
        processing: true,
        lengthMenu : [25, 50, 100],
        order:[[0,"asc"]],
        language: {
          url: 'assets/i18n/datatables/lang'+lang?.toUpperCase()+'.json'
          // emptyTable: '',
          // zeroRecords: 'No hay coincidencias',
          // lengthMenu: 'Mostrar _MENU_ elementos',
          // search: 'Buscar:',
          // info: 'De _START_ a _END_ de _TOTAL_ elementos',
          // infoEmpty: 'De 0 a 0 de 0 elementos',
          // infoFiltered: '(filtrados de _MAX_ elementos totales)',
          // paginate: {
          //   first: 'Prim.',
          //   last: 'Últ.',
          //   next: 'Sig.',
          //   previous: 'Ant.'
          // }
        }
    }
    this.datablesSettingsChild={
      deferRender : true,
      deferLoading:7,
      paging:false,
      searching: true,
      info:false,
      processing: true,
      order:[[0,"asc"]],
      autoWidth: false,
      language: {
        url: 'assets/i18n/datatables/lang'+lang?.toUpperCase()+'.json'
        // emptyTable: '',
        // zeroRecords: 'No hay coincidencias',
        // lengthMenu: 'Mostrar _MENU_ elementos',
        // search: 'Buscar:',
        // info: 'De _START_ a _END_ de _TOTAL_ elementos',
        // infoEmpty: 'De 0 a 0 de 0 elementos',
        // infoFiltered: '(filtrados de _MAX_ elementos totales)',
        // paginate: {
        //   first: 'Prim.',
        //   last: 'Últ.',
        //   next: 'Sig.',
        //   previous: 'Ant.'
        // }
      }
  }
  }
  public getUrl(): string {
    return this.url;
  }

  public setUrl(url: string): void {
      this.url = url;
  }

  /**
   * @see print fields that has incorrect values and invalidate some form
   * @param form
   */
  public findInvalidControls(form:FormGroup) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log(invalid);
  }
  public setDatatable(dataTable:any){                 
     
  }
  async confirmDelete(e: any):Promise<boolean>{
    console.log(e);
    let resultConfirm:boolean = false;
    await Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      resultConfirm = result.value;
    })
    console.log(resultConfirm);
    return resultConfirm;
  }
  async confirmOperation(e: any):Promise<boolean>{
    console.log(e);
    let resultConfirm:boolean = false;
    await Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea realizar esta operación?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      resultConfirm = result.value;
    })
    console.log(resultConfirm);
    return resultConfirm;
  }
  validateDeactivate(e: any){
    if(e.state == 0){
      Swal.fire('Inactivación de registro:', `El registro ya se encuentra inactivo`, 'warning');
      return false;
    }else{
      return true
    }
  }
  validateStatusToProcess(e: any){
    if(e.status == Status.COMPLETADO){
      Swal.fire('Edición de Registro:', `No se puede realizar esta operación a un registro en estado COMPLETADO`, 'warning');
      return false;
    }if(e.status == Status.ANULADO){
      Swal.fire('Edición de Registro:', `No se puede realizar esta operación a un registro en estado ANULADO`, 'warning');
      return false;
    }else{
      return true
    }
  }
  validateStatusToInvalidate(e: any){
    if(e.status == Status.REGISTRADO){
      Swal.fire('Edición de Registro:', `No se puede realizar esta operación a un registro en estado REGISTRADO`, 'warning');
      return false;
    }if(e.status == Status.ANULADO){
      Swal.fire('Edición de Registro:', `No se puede realizar esta operación a un registro en estado ANULADO`, 'warning');
      return false;
    }else{
      return true
    }
  }
  async confirmInactive(e: any):Promise<boolean>{
      console.log(e);
      if(e.state == 0){
        Swal.fire('Inactivación de registro:', `El registro ya se encuentra inactivo`, 'warning');
        return false;
      }
      let resultConfirm:boolean = false;
      await Swal.fire({
        title: 'Cuidado:',
        text: `¿Seguro que desea inactivar?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmar!'
      }).then((result) => {
        resultConfirm = result.value;
      });
      console.log(resultConfirm);
    return resultConfirm;
  }
  async confirmProcess(message: any):Promise<any> {
    try{
      let result = await Swal.fire({
        title: 'Cuidado:',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmar!'
      });
      return result;
    }catch(e){
        console.error(e);
        return e;
    }
}
  async confirmProcessWithMessage(message: any):Promise<boolean>{
    let resultConfirm:boolean = false;
    await Swal.fire({
      title: 'Cuidado:',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      resultConfirm = result.value;
    });
    console.log(resultConfirm);
  return resultConfirm;
}
  msgOkSave(){
    Swal.fire('Registro', `Grabado con éxito`, 'success');
  }
  msgOkSaveWithResult(message:string){
    Swal.fire('Registro', message, 'success');
  }
  msgOkGenReport(){
    Swal.fire('Registro', `Reporte en proceso de generación`, 'success');
  }
  msgOkGenProcess(){
    Swal.fire('Registro', `Proceso de Regeneración de movimientos en proceso de generación`, 'success');
  }
  msgProblemDate(){
    Swal.fire({
      title: 'Problema al grabar',
      text: `Datos de tipo fecha tienen formato incorrecto`,
      icon: 'warning'
    });
  }
  msgOkDelete(){
    Swal.fire('Eliminación de registro:', `Eliminado con éxito`, 'success');
  }
  msgOkOperation(){
    Swal.fire('Operación realizada correctamente:', `Realizado con éxito`, 'success');
  }
  msgOkInactive(){
    Swal.fire('Inactivación de registro:', `Inactivado con éxito`, 'success');
  }
  msgAccessDenied(){
    Swal.fire('Acceso denegado', `Ud. no tiene acceso a esta acción`, 'error');
  }
  msgProblemNoItems(){
    Swal.fire('Problema para continuar', `No ha agregado items para guardar`, 'error');
  }
  msgProblemItemsCero(){
    Swal.fire('Problema para continuar', `Todos los items deben tener un monto a cancelar`, 'error');
  }
  msgAccessDeniedWithMessage(msg:string){
    Swal.fire("Acceso Denegado", msg, 'error');
  }
  msgAccessDeniedWithParams(title:string,msg:string){
    Swal.fire(title, msg, 'error');
  }
  msgHTTP400WithMessage(msg:string){
    Swal.fire("Error en proceso", msg, 'warning');
  }
  msgWarning(title:string,msg:string){
    Swal.fire(title, msg, 'warning');
  }
  msgProblemDelete(){
    Swal.fire({
      title: 'Problema al eliminar',
      text: `Existe información que hace referencia a este registro`,
      icon: 'error'
    });
  }
  isEmail(search:string):boolean
    {
        var  serchfind:boolean;

        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = regexp.test(search);

        console.log(serchfind)
        return serchfind
    }
}
