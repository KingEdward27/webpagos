import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GenericListComponent } from 'src/app/base/components/generic-list/generic-list.component';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cnf-empresa',
  templateUrl: '../../base/components/generic-list/generic-list.component.html'
})

export class CnfEmpresaComponent extends GenericListComponent implements OnInit{
  //baseEndpoint = environment.apiUrl + '/get-all-cnf-org';
  prop ={
    "tableName": "cnf_empresa",
    "title": "Empresa",
    "columnsList":[{tableName: "cnf_empresa", columnName:"nombre",filterType:"text"},
                   {tableName: "cnf_empresa",columnName:"direccion",filterType:"text"},
                   {tableName: "cnf_distrito",columnName:"nombre",filterType:"none"},
                   {tableName: "cnf_moneda",columnName:"nombre",filterType:"none"}],
    //"columnsList":["name","address","cnf_company.name","cnf_district.name"],
    "foreignTables":[{"tableName":"cnf_distrito","idValue":"cnf_distrito_id"},
                {"tableName":"cnf_moneda","idValue":"cnf_moneda_id"}],
    "columnsForm":[{tableName: "cnf_empresa", "columnName":"nombre","type":"input"},
                   {tableName: "cnf_empresa", "columnName":"direccion","type":"input"},  
                   {tableName: "cnf_moneda", "columnName":"nombre","type":"select",loadState : 1,relatedBy:"cnf_moneda_id"},
                   {tableName: "cnf_region", "columnName":"nombre","type":"select",loadState : 1,loadFor:"cnf_distrito_id",load:{tableName:"cnf_provincia",loadBy:"cnf_region_id"}},
                   {tableName: "cnf_provincia", "columnName":"nombre","type":"select",loadState : 0,loadFor:"cnf_distrito_id",load:{tableName:"cnf_distrito",loadBy:"cnf_provincia_id"}},
                   {tableName: "cnf_distrito", "columnName":"nombre","type":"select",loadState : 0,loadFor:"cnf_distrito_id",relatedBy:"cnf_distrito_id"}
           ],
    //filters sería para filtros adicionales
    "filters":{"cnf_empresa.nombre":"","cnf_empresa.direccion":""},
    "orders":["nombre","direccion"]
  }
  constructor(private utilServices: UtilService,private httpClients:HttpClient,private routers: Router) { 
    super(utilServices,httpClients,routers);
  }
  ngOnInit(): void {
    super.baseEndpoint = this.baseEndpoint;
    super.properties = this.prop;
    console.log(this.prop);
    super.ngOnInit();
  }
  save(): void {
    console.log("test desde cnf-org");
  }
}

